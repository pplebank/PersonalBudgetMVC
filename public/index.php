<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');


session_start();


$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']); //default route
$router->add('{controller}/{action}');
$router->add('login', ['controller' => 'Login', 'action' => 'login']);
$router->add('register', ['controller' => 'Register', 'action' => 'new']);
$router->add('reset', ['controller' => 'Password', 'action' => 'reset']);
$router->add('logout', ['controller' => 'Login', 'action' => 'logout']);
$router->add('{controller}/{id:\d+}/{action}'); //custom regular expression with optional id
$router->add('admin/{controller}/{action}', ['namespace' => 'Admin']);

$router->dispatch($_SERVER['QUERY_STRING']);
