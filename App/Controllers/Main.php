<?php

namespace App\Controllers;

class Main extends \Core\Controller
{

    public function indexAction()
    {
        echo 'Hello from the index action in the Main controller!';
        echo '<p>Query string parameters: <pre>' .
        htmlspecialchars(print_r($_GET, true)) . '</pre></p>';
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
