<?php

namespace App\Controllers;

abstract class PageRequiresLogin extends \Core\Controller
{

    protected function before()
    {
        $this->requireLogin();
    }
}


