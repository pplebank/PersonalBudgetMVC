<?php

namespace App\Controllers;

use \App\Controllers\Flash;
use \App\Models\User;

class Login extends \Core\Controller
{

    public function loginAction()
    {
        if (isset($_POST['emailLogin'])) {

            $user = User::authenticate($_POST['emailLogin'], $_POST['passwordLogin']);
            $remember = isset($_POST['rememberUser']);

            if ($user) {

                Authentificator::setSession($user, $remember);
                Flash::addMessage('You logged successfully');
                $this->redirect(Authentificator::returnToPage());

            } else {
                Flash::addMessage('Problem with authentification', Flash::WARNING);
                $this->redirect('/');
            }
        } else {
            $this->redirect('/');
        }
    }

    public function logoutAction()
    {
        Authentificator::destroySession();
        $this->redirect('/login/logout-info');
    }

    public function logoutInfoAction()
    {
        Flash::addMessage('You logged out successfully');
        $this->redirect('/');

    }

}
