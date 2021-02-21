<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\RememberMe;

class Authentificator extends \Core\Controller
{

    public static function setSession($user, $remember)
    {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user->id;

        if ($remember) {

            if ($user->rememberUser()) {
                setcookie('rememberMe', $user->rememberCookieToken, $user->expiresDate, '/');
            }
        }
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
        static::forgetLoggedData();
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
        } else {

            return static::loginFromCookies();

        }
    }

    private static function loginFromCookies()
    {
        $cookie = $_COOKIE['rememberMe'] ?? false;

        if ($cookie) {
            $rememberMe = RememberMe::findByToken($cookie);

            if ($rememberMe && !$rememberMe->cookieExpired()) {

                $user = $rememberMe->getUser();
                static::setSession($user, false);

                return $user;
            }
        }
    }

    protected static function forgetLoggedData()
    {
        $cookie = $_COOKIE['rememberMe'] ?? false;

        if ($cookie) {

            $savedData = RememberMe::findByToken($cookie);

            if ($savedData) {

                $savedData->deleteCookiesAfterLogout();

            }
            setcookie('rememberMe', '', time() - 3600);  
        }
    }

}
