<?php

class Router
{

    protected $routes = [];
    protected $params = [];


    public function add($route, $params)
    {
        $route = preg_replace('/\//', '\\/', $route); //escape slashes

        $route = preg_replace('/\{([a-z]+)\}/', '(?P<\1>[a-z-]+)', $route); //change variables format {xyz}

        $route = preg_replace('/\{([a-z]+):([^\}]+)\}/', '(?P<\1>\2)', $route); //if this regular expression matches, then replace second party (optional id), else changed controller with second replacing

        $route = '/^' . $route . '$/i'; //insensitive flag (for e.g capitals)
        $this->routes[$route] = $params;
    }

    public function getRoutes()
    {
        return $this->routes;
    }

    public function match($url)
    {

        foreach ($this->routes as $route => $params) {
            if ($url == $route) {
                $this->params = $params;
                return true;
            }
        }
        
        $reg_exp = "/^(?P<controller>[a-z-]+)\/(?P<action>[a-z-]+)$/"; //reg expresion in format controler/action

        if (preg_match($reg_exp, $url, $matches)) {
            $params = [];

            foreach ($matches as $key => $match) {  //got params in array, now regroup params into params[key]
                if (is_string($key)) {
                    $params[$key] = $match;
                }
            }

            $this->params = $params;
            return true;
        }

        return false;
    }

    public function getParams()
    {
        return $this->params;
    }
}
