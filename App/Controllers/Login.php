<?php

namespace App\Controllers;

use \App\Models\User;
use \Core\View;

class Login extends \Core\Controller
{

    public function loginAction()
    {
        if (isset($_POST['emailLogin'])) {
            $user = User::authenticate($_POST['emailLogin'], $_POST['passwordLogin']);

            if ($user) {
                Authentificator::setSession($user);
                $this->redirect(Authentificator::returnToPage());
            } else {
                View::renderTemplate('Home/index.html', ['emailLogin' => $_POST['emailLogin'], 'phpMessage' => 'Problem with authentication']);
            }
        } else {
            $this->redirect('/');
        }
    }

    public function logoutAction()
    {
        Authentificator::destroySession();
        $this->redirect('/');
    }

}
