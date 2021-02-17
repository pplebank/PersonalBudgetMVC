<?php

namespace App\Controllers;

use \App\Models\User;
use \Core\View;

//dont need to use full path to file

class Home extends \Core\Controller
{

    public function indexAction()
    {
        View::renderTemplate('Home/index.html');
    }

/*
    public function getURL()
    {
        $baseUrl = ('http://' . $_SERVER['HTTP_HOST']);

        header('Content-Type: application/json');
        echo json_encode($baseUrl);
    }
*/
}
