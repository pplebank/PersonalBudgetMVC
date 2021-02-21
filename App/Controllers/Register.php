<?php

namespace App\Controllers;

use \App\Models\User;
use \Core\View;

class Register extends \Core\Controller
{

    public function newAction()
    {
        if (!empty($_POST)) {
            $user = new User($_POST);

            if ($user->save()) {
                Flash::addMessage('You registered successfully');
                $this->redirect('/');
                exit;

            } else {
                View::renderTemplate('Home/index.html', [
                    'user' => $user,
                ]);
            }
        } else {
            $this->redirect('/');
        }
    }

}
