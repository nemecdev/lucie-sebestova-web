<?php

namespace App\Email;

enum MIME: string
{
    case TXT_PLAIN = 'text/plain';
    case TXT_HTML = 'text/html';
    case MP_MIXED = 'multipart/mixed';
    case MP_ALTERNATIVE = 'multipart/alternative';
}