<?php

namespace App\Controllers\Admin;

class Users extends \Core\Controller
{

    protected function before()
    {
        // Check if admin is logged in
        // return false;
    }

    public function indexAction()
    {
        echo 'User admin index';
    }
}
