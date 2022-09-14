<?php

namespace App;

use \MF\Init\Bootstrap;

class Route extends Bootstrap
{
    protected function initRoutes()
    {

        $routes['index'] = [
            'route' => '/',
            'controller' => 'IndexController',
            'action' => 'index'
        ];

        $routes['gravar'] = [
            'route' => '/gravar',
            'controller' => 'IndexController',
            'action' => 'gravar'
        ];

        $routes['ler'] = [
            'route' => '/ler',
            'controller' => 'IndexController',
            'action' => 'ler'
        ];

        $this->setRoutes($routes);
    }
}
