<?php

namespace App\Controllers;

use \Core\View;
use \App\Models\User;

class Signup extends \Core\Controller
{

    public function newAction()
    {
       // var_dump($_POST);
        $user = new User ($_POST);

      if($user->save()){
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/signup/success', true, 303);
        exit;
      } else {
        View::renderTemplate('Home/index.html', [
            'user' => $user
        ]);
      }

    }

    public function successAction()
    {
        View::renderTemplate('Home/success.html');
    }

}
