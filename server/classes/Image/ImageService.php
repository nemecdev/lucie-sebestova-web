<?php

namespace App\Image;

use App\Image\Model\Image;
use App\Validator\PathValidator;
use App\Validator\ValidationException;

final class ImageService
{
    const DEFAULT_DIR_NAME = '/public/img';
    const ALLOWED_MIME_TYPES = [
        MIME::JPEG,
        MIME::PNG,
        MIME::GIF,
    ];

    private PathValidator $pathValidator;
    private ImageList $imgList;
    private string $baseDir;
    private string $imgDir;
    private array $errs;

    public function __construct(string $baseDir, PathValidator $pathValidator)
    {
        $this->pathValidator = $pathValidator;
        $this->baseDir = $baseDir;
        $this->imgDir = $baseDir . '/' . self::DEFAULT_DIR_NAME;
        $this->imgList = new ImageList();
        $this->errs = [];
    }

    public function setImgDir(string $imgDir): void
    {
        try {
            $imgDir = $this->baseDir . '/' . $imgDir;
            $this->pathValidator->validate($imgDir);
            $this->imgDir = $imgDir;
        } catch (ValidationException $e) {
            $this->errs[] = $e->getMessage();

            return;
        }
    }

    public function getImageList(): ImageList
    {
        if (\sizeof($this->imgList) === 0) {
            $this->scanDirForImages();
        }

        return $this->imgList;
    }

    public function getErrors(): array
    {
        return $this->errs;
    }

    private function scanDirForImages(): void
    {
        try {
            if (is_dir($this->imgDir)) {
                $images = array_values(array_filter(
                    \scandir($this->imgDir),
                    function ($fileName) {
                        $mime = \mime_content_type(
                            $this->imgDir . "/{$fileName}"
                        );

                        return \in_array(MIME::tryFrom($mime), self::ALLOWED_MIME_TYPES);
                    }
                ));

                $this->constructImages($images);
            }
        } catch (ValidationException $e) {
            $this->errs[] = $e->getMessage();

            return;
        }
    }

    private function constructImages(?array $images = []): void
    {
        foreach ($images as $fileName) {
            $this->imgList->push(
                $this->createImage(
                    $fileName
                )
            );
        }
    }

    private function createImage(string $fileName): Image
    {
        $file = $this->imgDir . "/{$fileName}";
        $imageSize = \getimagesize($file);
        $imageStat = \stat($file);

        $image = new Image();
        $image->setName($fileName);
        $image->setContentSize($imageStat['size']);
        $image->setEncodingFormat(MIME::from(mime_content_type($file)));
        $image->setWidth($imageSize[0]);
        $image->setHeight($imageSize[1]);

        return $image;
    }
}
