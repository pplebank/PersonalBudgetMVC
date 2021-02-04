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
}
