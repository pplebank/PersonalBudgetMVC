<?php

namespace App\Controllers;

use \Core\View;

class Main extends \Core\Controller
{

    public function indexAction()
    {
        View::renderTemplate('Main/index.html', ['variable' => 'someVariable']);
    }

    public function newExpenseAction()
    {
        echo 'Hello from the newExpense action in the Main controller!';
    }

    public function editAction()
    {
        echo 'Hello from the edit action in the Main controller!';
        echo '<p>Route parameters: <pre>' .
        htmlspecialchars(print_r($this->route_params, true)) . '</pre></p>';
    }

}
