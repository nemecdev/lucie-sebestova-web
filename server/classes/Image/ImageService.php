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
    const OMIT_DIR_LIST = [
        '.',
        '..',
    ];

    private PathValidator $pathValidator;
    private ImageList $imgList;
    private string $baseDir;
    private string $imgDir;
    private string $forbiddenAlbumName;
    private array $errs;

    public function __construct(string $baseDir, PathValidator $pathValidator)
    {
        $this->pathValidator = $pathValidator;
        $this->baseDir = $baseDir;
        $this->imgDir = $baseDir . '/' . self::DEFAULT_DIR_NAME;
        $imgDirExploded = \explode('/', $this->imgDir);
        $this->forbiddenAlbumName = $imgDirExploded[\sizeof($imgDirExploded) - 1];
        $this->imgList = new ImageList();
        $this->errs = [];
    }

    public function setImgDir(string $imgDir): void
    {
        try {
            $imgDir = $this->baseDir . '/' . $imgDir;
            $this->pathValidator->validate($imgDir);
            $this->imgDir = $imgDir;
            $imgDirExploded = \explode('/', $this->imgDir);
            $this->forbiddenAlbumName = $imgDirExploded[\sizeof($imgDirExploded) - 1];
        } catch (ValidationException $e) {
            $this->errs[] = $e->getMessage();

            return;
        }
    }

    public function getImageList(): ImageList
    {
        if (\sizeof($this->imgList) === 0) {
            $this->scanDirForImages($this->imgDir);
        }

        return $this->imgList;
    }

    public function getErrors(): array
    {
        return $this->errs;
    }

    private function scanDirForImages(string $imgDir): void
    {
        try {
            if (\is_dir($imgDir)) {
                $images = array_values(
                    array_filter(
                        \scandir($imgDir),
                        function ($fileName) use ($imgDir) {
                            if (\in_array($fileName, self::OMIT_DIR_LIST)) {
                                return false;
                            }

                            if (\is_dir($imgDir . "/{$fileName}")) {
                                $this->scanDirForImages($imgDir . "/{$fileName}");
                            }

                            $mime = \mime_content_type($imgDir . "/{$fileName}");

                            return \in_array(MIME::tryFrom($mime), self::ALLOWED_MIME_TYPES);
                        }
                    )
                );

                array_walk($images, function (&$fileName, $key, $imgDir) {
                    $fileName = $imgDir . "/{$fileName}";
                }, $imgDir);

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
        $file = $fileName;
        $fileNameParts = \explode('/', $fileName);
        $imageSize = \getimagesize($file);
        $imageStat = \stat($file);

        $imageName = $fileNameParts[\sizeOf($fileNameParts) - 1];
        $imageAlbum = $fileNameParts[\sizeOf($fileNameParts) - 2];

        $image = new Image();
        if ($imageAlbum !== $this->forbiddenAlbumName) {
            $image->setAlbum($imageAlbum);
        }

        $image->setName($imageName);
        $image->setContentSize($imageStat['size']);
        $image->setEncodingFormat(MIME::from(mime_content_type($file)));
        $image->setWidth($imageSize[0]);
        $image->setHeight($imageSize[1]);

        return $image;
    }
}
