<?php

namespace Core;

class View
{

    public static function render($view, $args =[])
    {
        extract($args, EXTR_SKIP);  //flag to avoid collisions
        $file = "../App/Views/$view";  

        if (is_readable($file)) {
            require $file;
        } else {
            echo "$file not found";
        }
    }

    public static function renderTemplate($template, $args = [])
    {
        static $twig = null;

        if ($twig === null) {
            $loader = new \Twig\Loader\FilesystemLoader(dirname(__DIR__) . '/App/Views'); 
            $twig = new \Twig\Environment($loader);
        }

        echo $twig->render($template, $args);
    }


}
