<?php

namespace App\Validator;

use App\Image\Model\Image;

class ImageValidator implements ValidatorInterface
{
    public function validate(mixed $items): void
    {
        if (empty($items)) {
            return;
        }

        if (!\is_scalar($items)) {
            $this->validateEach($items);
        } else {
            $this->validateOne($items);
        }
    }

    private function validateEach(mixed $items): void
    {
        foreach ($items as $item) {
            $this->validateOne($item);
        }
    }

    private function validateOne(mixed $item): void
    {
        if (!is_a($item, Image::class)) {
            throw new ValidationException(sprintf('ImageList::validate: "%s" is not an Image::class', $item));
        }
    }
}
