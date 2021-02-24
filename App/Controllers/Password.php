<?php

namespace App\Controllers;

use \App\Controllers\Flash;
use \App\Models\User;

class Password extends \Core\Controller
{

    public function resetAction()
    {
        User::passwordReset($_POST['emailReset']);
        Flash::addMessage('Reset form sent. Please check your email.', Flash::INFO);
        $this->redirect('/');
    }

}
