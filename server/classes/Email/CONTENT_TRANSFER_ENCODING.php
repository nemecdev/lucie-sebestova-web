<?php

namespace App\Email;

enum CONTENT_TRANSFER_ENCODING: string
{
    case BASE64 = 'base64';
    case QUOTED_PRINTABLE = 'quoted-printable';
    case SEVEN_BIT = '7bit';
    case EIGHT_BIT = '8bit';
}