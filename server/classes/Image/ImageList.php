<?php

namespace App\Image;

use App\Export\ExportAwareInterface;
use App\Image\Model\Image;
use App\Validator\ImageValidator;
use App\Validator\ValidatorInterface;

final class ImageList implements
    ExportAwareInterface,
    \IteratorAggregate,
    \ArrayAccess,
    \Countable
{
    private array $images;
    private ValidatorInterface $imageValidator;

    public function __construct(...$args)
    {
        $this->imageValidator = new ImageValidator();
        try {
            $items = $args;
            if (\func_num_args() === 1) {
                $items = $args[0];
            }

            $this->imageValidator->validate($items);
            $this->images = $items;
        } catch (\ErrorException $e) {
            throw $e;
        }
    }

    public function getIterator(): \Traversable
    {
        return (function () {
            foreach ($this->images as $id => $value) {
                yield $id => $value;
            }
        })();
    }

    public function set(string $key, Image $image): void
    {
        $this->images[$key] = $image;
    }

    public function get(string $key, ?Image $default = null): Image
    {
        return $this->images[$key] ?? $default;
    }

    public function all(): array
    {
        return $this->images;
    }

    public function push(Image $image): void
    {
        $this->images[] = $image;
    }

    public function shift(): Image
    {
        return \array_shift($this->images);
    }

    public function pop(): Image
    {
        return \array_pop($this->images);
    }

    public function offsetSet(mixed $offset, mixed $value): void
    {
        if ($offset === null) {
            $this->images[] = $value;
        } else {
            $this->images[$offset] = $value;
        }
    }

    public function offsetUnset(mixed $offset): void
    {
        if ($this->offsetExists($offset)) {
            \unset($this->images[$offset]);
        }
    }

    public function offsetGet(mixed $offset): mixed
    {
        return $this->images[$offset] ?? null;
    }

    public function offsetExists(mixed $offset): bool
    {
        return \isset($this->images[$offset]);
    }

    public function count(): Int
    {
        return \count($this->images);
    }

    /**
     * Returns Image[] exported as arrays.
     *
     * {@inheritdoc}
     */
    public function exportAsArray(): array
    {
        $images = [];
        foreach ($this->images as $image) {
            /** @var ExportAwareInterface $image */
            $images[] = $image->exportAsArray();
        }

        return $images;
    }

    public function exportAsJSON(): string
    {
        return \json_encode($this->exportAsArray());
    }

    public function __serialize()
    {
        $data = [];
        foreach ($this->images as $id => $image) {
            $data[$id] = \serialize($image);
        }

        return $data;
    }

    public function __unserialize(array $data)
    {
        $images = [];
        $imageValidator = new ImageValidator();
        foreach ($data as $item) {
            $images[] = unserialize($item);
        }

        $imageValidator->validate($images);
        $this->images = $images;
    }
}
