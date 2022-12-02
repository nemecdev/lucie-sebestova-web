<?php

namespace App\Validator;

/**
 * Common Validator interface.
 */
interface ValidatorInterface
{
    /**
     * Validates subject.
     *
     * @param mixed $subject Subject of validation
     */
    public function validate(mixed $subject): void;
}
