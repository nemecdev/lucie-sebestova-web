<?php

namespace App\Email;

use App\Email\CONTENT_TRANSFER_ENCODING as CTE;

class EmailService
{
    private EmailFactory $emailFactory;
    private array $errors;
    private array $recipients;
    private string $sender;

    public function __construct(EmailFactory $emailFactory, string $sender, array $recipients)
    {
        $this->emailFactory = $emailFactory;
        $this->recipients = $recipients;
        $this->sender = $sender;
        $this->errors = [];
    }

    public function sendMail(array $data): string
    {
        $message = 'Email byl ůspěšně odeslán';
        $email = $this->emailFactory->create();
        $email->setContentTransferEncoding(CTE::BASE64);
        $email->setFrom($this->sender);
        $email->setSubject(
          $this->toB64Subject(
            \sprintf(
              'WebMail - %s',
              $data['subject']
            )
          )
        );
        $email->setMessage(
            \base64_encode(
                \sprintf(
                    'Zpráva Od: %s%s%s',
                    $data['email'],
                    "\n\n",
                    $data['message']
                )
            )
        );
        
        foreach ($this->recipients as $recipient) {
            $email->addRecipient(
                $this->toB64Recipient(
                    $recipient
                )
            );
        }

        $status = \mail(
            implode(
                ', ',
                $email->getRecipients()
            ),
            $email->getSubject(),
            $email->getMessage(),
            $email->getHeaders()
        );

        if (!$status) {
            $message = 'Při odesílání emailu došlo k chybě';
            $this->errors[] = $message;
        }

        return $message;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    private function toB64Subject(string $subject): string
    {
        return \sprintf('=?UTF-8?B?%s?=', \base64_encode($subject));
    }

    private function toB64Recipient(string $recipient): string
    {
        $mailPartStartId = \strpos($recipient, '<');
        $mailPartEndId = \strpos($recipient, '>');

        $name = \substr($recipient, 0, $mailPartStartId);
        $email = \substr($recipient, $mailPartStartId, $mailPartEndId);

        return \sprintf('=?UTF-8?B?%s?=%s', \base64_encode($name), $email);
    }
}