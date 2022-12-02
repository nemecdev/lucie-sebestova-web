<?php

namespace App\Validator;

class PathValidator implements ValidatorInterface
{
    public function validate(mixed $dir): void
    {
        $restricted = preg_match('/\.{2}/', $dir);

        if ($restricted) {
            throw new ValidationException("\"{$dir}\" is not allowed because ../ restriction.");
        }
    }
}
