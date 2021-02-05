<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']); //default route
$router->add('{controller}/{action}');
$router->add('{controller}/{id:\d+}/{action}'); //custom regular expression with optional id
$router->add('admin/{controller}/{action}', ['namespace' => 'Admin']);

$router->dispatch($_SERVER['QUERY_STRING']);
