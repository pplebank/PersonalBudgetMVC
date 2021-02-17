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
                View::renderTemplate('Home/index.html', ['phpMessage' => 'You registered successfully']);
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
