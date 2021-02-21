<?php

namespace App\Controllers;

use \Core\View;

//dont need to use full path to file

class Home extends \Core\Controller
{

    protected function before()
    {
        if (Authentificator::getUser()) {

            $this->redirect('/main/index');
        }
    }

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
