<?php

namespace App\Email;

use App\Email\Model\Email;

class EmailFactory
{
    public function create(): Email
    {
        $email = new Email();
        $email->setCharset('UTF-8');
        $email->setMIME(MIME::TXT_PLAIN);
        
        return $email;
    }
}