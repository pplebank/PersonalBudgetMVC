<?php

echo 'Requested URL = "' . $_SERVER['QUERY_STRING'] . '"';

require '../Core/Router.php';

$router = new Router();

$router->add('{controller}/{action}');
$router->add('{controller}/{id:\d+}/{action}'); //custom regular expression with optional id 
  
$url = $_SERVER['QUERY_STRING'];

if ($router->match($url)) {
    echo '<pre>';
    var_dump($router->getParams());
    echo '</pre>';
} else {
    echo "No route found for URL '$url'";
}
