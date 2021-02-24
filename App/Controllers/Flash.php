<?php

namespace App\Controllers;

class Flash
{
    const SUCCESS = 'success';
    const INFO = 'info';
    const WARNING = 'warning';

    public static function addMessage($message, $type = 'success')
    {
        if (!isset($_SESSION['flashMessages'])) {
            $_SESSION['flashMessages'] = [];
        }
        $_SESSION['flashMessages'][] = [
            'body' => $message,
            'type' => $type,
        ];
    }

    public static function getMessages()
    {
        if (isset($_SESSION['flashMessages'])) {
            $messages = $_SESSION['flashMessages'];
            unset($_SESSION['flashMessages']);

            return $messages;
        }
    }
}
