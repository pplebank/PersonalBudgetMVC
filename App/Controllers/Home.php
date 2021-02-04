<?php

namespace App\Controllers;

use \Core\View; //dont need to use full path to file

class Home extends \Core\Controller
{

    public function indexAction()
    {
        View::render('Home/index.php', ['variable' => 'someVariable']);
    }

    public function loginAction()
    {
        echo 'Hello from the login action in the Home controller!';
    }
}