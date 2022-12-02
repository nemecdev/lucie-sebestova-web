<?php

namespace App\Export;

interface ExportAwareInterface
{
    /**
     * Returns data as array.
     */
    public function exportAsArray(): array;

    /**
     * Returns data as JSON string.
     *
     * Native json_encode() used.
     */
    public function exportAsJSON(): string;
}
