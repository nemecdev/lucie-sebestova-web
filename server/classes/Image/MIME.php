<?php

namespace App\Image;

enum MIME: string
{
    case JPEG = 'image/jpeg';
    case PNG = 'image/png';
    case GIF = 'image/gif';
    case UNKNOWN = 'unknown';
}
