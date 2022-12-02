<?php

error_reporting(E_ALL);

use App\App;

require_once __DIR__ . '/../../vendor/autoload.php';

$config = include __DIR__ . '/../../server/config.php';
$data = ['errors' => [], 'message' => ''];
$app = new App();
$container = $app->createContainer($config);

$action = \filter_input(INPUT_GET, 'act');
if ($action === 'getImgList') {
    $is = $container->get('ImageService');
    $images = $is->getImageList();

    $data = $images->exportAsArray();
    $data['errors'] = $is->getErrors();
    $data['message'] = 'Data retrieved';
} elseif ($action === 'sendMail') {
    $onErrorExit = function () use($data) {
        echo \json_encode($data);

        exit;
    };

    // FILTER VALIDATE
    $filterArgs = [
      'email' => FILTER_VALIDATE_EMAIL,
      'subject' => FILTER_DEFAULT,
      'message' => FILTER_DEFAULT,
      'agreement' => FILTER_VALIDATE_BOOL,
    ];
    $filteredArgs = [];
    if ($_SERVER['CONTENT_TYPE'] !== 'multipart/form-data') {
        $filteredArgs = \filter_var_array(
            \json_decode(\file_get_contents('php://input'), true),
            $filterArgs
        );
    } else {
        $filteredArgs = \filter_input_array(
            INPUT_POST,
            $filterArgs
        );
    }

    if (\in_array(null, $filteredArgs, true) || \in_array(false, $filteredArgs, true)) {
        $data['errors'][] = 'Selhalo ověření dat v odesílaném emailu a email se neodeslal.';
        $onErrorExit();
    }

    if ($filteredArgs['subject'] === '' || $filteredArgs['message'] === '') {
        $onErrorExit();
    }

    // SETTING UP EMAIL PROPS
    $emailService = $container->get('EmailService');
    $data['errors'] = \array_merge($data['errors'], $emailService->getErrors());
    $data['message'] = $emailService->sendMail($filteredArgs);
}

echo \json_encode($data);