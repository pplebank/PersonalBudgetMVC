<?php

namespace App\Models;

use PDO;
use \App\Controllers\Mail;
use \App\Controllers\Token;

class User extends \Core\Model
{

    public $errors = [];

    public function __construct($data = [])
    {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        };
    }

    public function save()
    {
        $this->validate();
        if (empty($this->errors)) {

            $password_hash = password_hash($this->password, PASSWORD_DEFAULT);

            $sql = 'INSERT INTO users (name, email, password_hash)
            VALUES (:name, :email, :password_hash)';

            $db = static::getDB();
            $stmt = $db->prepare($sql);

            $stmt->bindValue(':name', $this->name, PDO::PARAM_STR);
            $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
            $stmt->bindValue(':password_hash', $password_hash, PDO::PARAM_STR);

            return $stmt->execute();
        }
        return false;
    }

    public function validate()
    {

        if ($this->name == '') {
            $this->errors[] = 'Name is required';
        }

        if (filter_var($this->email, FILTER_VALIDATE_EMAIL) === false) {
            $this->errors[] = 'Invalid email';
        }

        if (static::emailExists($this->email)) {
            $this->errors[] = 'email already taken';
        }
        if ($this->password != $this->passwordConfirmation) {
            $this->errors[] = 'Password must match confirmation';
        }

        if (strlen($this->password) < 6) {
            $this->errors[] = 'Please enter at least 6 characters for the password';
        }

        if (preg_match('/.*[a-z]+.*/i', $this->password) == 0) {
            $this->errors[] = 'Password needs at least one letter';
        }

        if (preg_match('/.*\d+.*/', $this->password) == 0) {
            $this->errors[] = 'Password needs at least one number';
        }
    }

    public static function emailExists($email)
    {
        return static::findByEmail($email) !== false;
    }

    public static function findByEmail($email)
    {
        $sql = 'SELECT * FROM users WHERE email = :email';

        $db = static::getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);

        $stmt->setFetchMode(PDO::FETCH_CLASS, get_called_class());

        $stmt->execute();

        return $stmt->fetch();
    }

    public static function authenticate($email, $password)
    {
        $user = static::findByEmail($email);

        if ($user) {
            if (password_verify($password, $user->password_hash)) {
                return $user;
            }
        }

        return false;
    }

    public static function findByID($id)
    {
        $sql = 'SELECT * FROM users WHERE id = :id';

        $db = static::getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->setFetchMode(PDO::FETCH_CLASS, get_called_class());

        $stmt->execute();

        return $stmt->fetch();
    }

    public function rememberUser()
    {
        $token = new Token();
        $tokenHashed = $token->getHash();
        $valueOfToken = $token->getValue();
        $expiresDate = time() + 60 * 60 * 24 * 7;

        $this->saveCookieData($valueOfToken, $expiresDate);

        $sql = 'INSERT INTO login_remember (token_hash, id, expires_date)
                VALUES (:tokenHash, :id, :expiresDate)';

        $db = static::getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindValue(':tokenHash', $tokenHashed, PDO::PARAM_STR);
        $stmt->bindValue(':id', $this->id, PDO::PARAM_INT);
        $stmt->bindValue(':expiresDate', date('Y-m-d H:i:s', $expiresDate), PDO::PARAM_STR);

        return $stmt->execute();
    }

    private function saveCookieData($tokenValue, $date)
    {

        $this->rememberCookieToken = $tokenValue;
        $this->expiresDate = $date;

    }

    public static function passwordReset($email)
    {

        $user = static::findByEmail($email);
        if ($user) {
            $beginResult = $user->PasswordResetBegin();

            if ($beginResult) {

                $user->sendMailWithResetForm();
            }

        }

    }

    private function saveResetToken($tokenValue)
    {
        $this->passwordResetToken = $tokenValue;
    }

    protected function PasswordResetBegin()
    {
        $token = new Token();
        $tokenHashed = $token->getHash();
        $valueOfToken = $token->getValue();

        $this->saveResetToken($valueOfToken);

        $expiresDate = time() + 60 * 30; // 30 minutes

        $sql = 'UPDATE users
                SET reset_password_hash = :tokenHashed,
                reset_password_date = :expiresDate
                WHERE id = :id';

        $db = static::getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindValue(':tokenHashed', $tokenHashed, PDO::PARAM_STR);
        $stmt->bindValue(':expiresDate', date('Y-m-d H:i:s', $expiresDate), PDO::PARAM_STR);
        $stmt->bindValue(':id', $this->id, PDO::PARAM_INT);

        return $stmt->execute();

    }

    protected function sendMailWithResetForm()
    {
        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/reset' . '/' . $this->passwordResetToken;

        Mail::send($this->email, $this->name, 'Password reset', 'ResetPasswordMessage.html', ['url' => $url]);
    }

    public function resetHashExpired()
    {

        //SAME CHECK AS IN REMEMBERME, TO REFACTOR
        $result = strtotime($this->expires_date) < time();
        return $result;
    }

    public static function findUserByPasswordResetHash($token)
    {
        $token = new Token($token);
        $tokenHashed = $token->getHash();

        $sql = 'SELECT * FROM users
                WHERE reset_password_hash = :tokenHashed';

        $db = static::getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindValue(':tokenHashed', $tokenHashed, PDO::PARAM_STR);

        $stmt->setFetchMode(PDO::FETCH_CLASS, get_called_class());

        $stmt->execute();

        $user = $stmt->fetch();

        if ($user) {

            if (!$this->resetHashExpired($user->reset_password_hash)) {

                return $user;

            }
        }
    }

}
