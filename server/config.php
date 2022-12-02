<?php

use App\Image\ImageService;
use App\Email\EmailFactory;
use App\Email\EmailService;
use App\Validator\PathValidator;

use function DI\create;
use function DI\get;

return [
    'baseDir' => dirname(__FILE__, 2),
    'imgDir' => '/dist/img/portfolio/fullsize',
    'emailSender' => 'WebMail <web-mail@nazarenus.cz>',
    'emailRecipients' => ['Lucie Šebestová <lucielsebestova@gmail.com>'],

    'EmailFactory' => create(EmailFactory::class)
        ->constructor()
    ,
    'PathValidator' => create(PathValidator::class)
        ->constructor()
    ,
    'ImageService' => create(ImageService::class)
        ->constructor(
            get('baseDir'),
            get('PathValidator')
        )
        ->method('setImgDir', get('imgDir'))
    ,
    'EmailService' => create(EmailService::class)
        ->constructor(
            get('EmailFactory'),
            get('emailSender'),
            get('emailRecipients')
        )
    ,
];
