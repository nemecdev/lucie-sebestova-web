<?php

namespace App\Email\Model;

use App\Email\CONTENT_TRANSFER_ENCODING;
use App\Email\MIME;

class Email
{
    private array $headers;
    private array $recipients;
    private array $cc;
    private array $bcc;
    private string $from;
    private string $subject;
    private string $message;
    private string $charset;
    private MIME $mime;

    public function __construct()
    {
        $this->initDefaults();
    }

    public function setFrom(string $from): void
    {
        $this->from = $from;
    }

    public function getFrom(): string
    {
        return $this->from;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function setCharset(string $charset): void
    {
        $this->charset = $charset;
    }

    public function getCharset(): string
    {
        return $this->charset;
    }

    public function setMIME(MIME $mime): void
    {
        $this->mime = $mime;
    }

    public function getMIME(): MIME
    {
        return $this->mime;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function addRecipient(string $recipient): void
    {
        $this->recipients[] = $recipient;
    }

    public function getRecipients(): array
    {
        return $this->recipients;
    }

    public function addCC(string $cc): void
    {
        $this->cc[] = $cc;
    }

    public function getCc(): string
    {
        return $this->cc;
    }

    public function addBCC(string $bcc): void
    {
        $this->bcc[] = $bcc;
    }

    public function getBcc(): string
    {
        return $this->bcc;
    }

    public function setContentTransferEncoding(CONTENT_TRANSFER_ENCODING $cte): void
    {
        $this->headers['Content-Transfer-Encoding'] = $cte->value;
    }

    public function getHeaders(): array
    {
        $this->setupHeaders();

        return $this->headers;
    }

    private function initDefaults(): void
    {
        $this->initDefaultProperties();
        $this->setupHeaders();
    }

    private function initDefaultProperties(): void
    {
        $this->recipients = [];
        $this->cc = [];
        $this->bcc = [];

        $this->from = 'System <root@localhost>';
        $this->charset = 'utf-8';
        $this->mime = MIME::TXT_PLAIN;

        $this->message = '';
        $this->subject = 'Email from ROOT';
    }

    private function setupHeaders(): void
    {
        $this->headers['MIME-Version'] = '1.0';
        $this->headers['Content-Type'] = \sprintf(
            '%s; charset=%s',
            $this->mime->value,
            $this->charset
        );
        $this->headers['Content-Transfer-Encoding'] = 'base64';
        $this->headers['From'] = $this->from;
        $this->headers['Cc'] = \implode(', ', $this->cc);
        $this->headers['Bcc'] = \implode(', ', $this->bcc);
    }
}