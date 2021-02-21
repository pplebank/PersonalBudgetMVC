<?php

namespace Core;

use \App\Controllers\Authentificator;
use \App\Controllers\Flash;

class View

{

    public static function render($view, $args =[])
    {
        extract($args, EXTR_SKIP);  //flag to avoid collisions
        $file = "../App/Views/$view";  

        if (is_readable($file)) {
            require $file;
        } else {
            throw new \Exception("$file not found");
        }
    }

    public static function renderTemplate($template, $args = [])
    {
        static $twig = null;

        if ($twig === null) {
            $loader = new \Twig\Loader\FilesystemLoader(dirname(__DIR__) . '/App/Views'); 
            $twig = new \Twig\Environment($loader);

            $twig->addGlobal('user', Authentificator::getUser());  
            $twig->addGlobal('flashMessages', Flash::getMessages());
        }

        echo $twig->render($template, $args);
    }


}
