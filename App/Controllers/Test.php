<?php

namespace App\Controllers;

use App\Controllers\Mail;

class Test extends \Core\Controller
{

    public function testAction()
    {

        $pathToResetMessage = 'ResetPasswordMessage.html';
        Mail::send('', 'test', 'test', $pathToResetMessage);
        $this->redirect('/');
    }

}
