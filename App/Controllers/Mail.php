<?php

namespace App\Controllers;

use App\Config;
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\PHPMailer;
use \Core\View;

class Mail extends \Core\Controller
{

    public static function send($receiver, $nameReceiver, $subject, $messagePath, $params = [])
    {

        date_default_timezone_set('Etc/UTC');
        $mail = new PHPMailer();
        $mail->isSMTP();
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPAuth = true;
        $mail->AuthType = 'XOAUTH2';
        $email = Config::EMAIL_MAIL;
        $clientId = Config::EMAIL_CLIENT_ID;
        $clientSecret = Config::EMAIL_PASSWORD;
        $refreshToken = Config::MAIL_REFRESH_TOKEN;

        $provider = new Google(
            [
                'clientId' => $clientId,
                'clientSecret' => $clientSecret,
            ]
        );

        $mail->setOAuth(
            new OAuth(
                [
                    'provider' => $provider,
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                    'refreshToken' => $refreshToken,
                    'userName' => $email,
                ]
            )
        );

        $mail->setFrom($email, 'ServerInfo');
        $mail->addAddress($receiver, $nameReceiver);

        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->Subject = $subject;
        // $mail->msgHTML(file_get_contents($HTMLFile,true), __DIR__);

        //Getting html file, using template engine
        //Need first render via Render function and catch output, so then it's possible to write email in template engine

        ob_start();
        View::RenderTemplate($messagePath, $params);
        $out1 = ob_get_contents();
        ob_end_clean();

        $mail->msgHTML($out1, __DIR__);

        //$mail->addAttachment('images/phpmailer_mini.png');

        if (!$mail->send()) {
            Flash::addMessage('Mail error' . $mail->ErrorInfo, Flash::WARNING);
        } else {
            Flash::addMessage('Mail was sent successfully');
        }

    }
}
