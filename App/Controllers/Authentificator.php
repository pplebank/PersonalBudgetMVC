<?php

namespace App\Controllers;
use App\Models\User;

class Authentificator extends \Core\Controller
{

    public static function setSession($user)
    {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user->id;
    }

    public static function destroySession()
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }
        session_destroy();
    }

    public static function isLoggedIn()
    {
        return isset($_SESSION['user_id']);
    }

    public static function rememberPage()
    {
        $_SESSION['return'] = $_SERVER['REQUEST_URI'];
    }

    public static function returnToPage()
    {
        return $_SESSION['return'] ?? '/main/index'; //default main site
    }

    public static function getUser()
    {
        if (isset($_SESSION['user_id'])) {
            return User::findByID($_SESSION['user_id']);
        }
    }

}
