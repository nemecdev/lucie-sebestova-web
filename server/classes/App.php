<?php

namespace App;

use DI\Container;
use DI\ContainerBuilder;

final class App
{
    private ?Container $container;

    public function __construct()
    {
        $this->container = null;
    }

    public function createContainer(array $config): Container
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(false);
        $builder->useAnnotations(false);
        $builder->addDefinitions($config);
        $this->container = $builder->build();

        return $this->container;
    }

    public function getContainer(): ?Object
    {
        return $this->container;
    }
}