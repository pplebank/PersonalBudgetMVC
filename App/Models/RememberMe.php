<?php

namespace App\Models;

use PDO;
use \App\Controllers\Token;

class RememberMe extends \Core\Model
{
    public static function findByToken($token)
    {
        $token = new Token($token);
        $hashedToken = $token->getHash();

        $sql = 'SELECT * FROM login_remember
                WHERE token_hash = :token_hash';

        $db = static::getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':token_hash', $hashedToken, PDO::PARAM_STR);

        $stmt->setFetchMode(PDO::FETCH_CLASS, get_called_class());

        $stmt->execute();

        return $stmt->fetch();
    }

    public function getUser()
    {
        return User::findByID($this->id);
    }

    public function cookieExpired()
    {
        $result = strtotime($this->expires_date) < time();
        return $result;
    }

    public function deleteCookiesAfterLogout()
    {
        $sql = 'DELETE FROM login_remember
                WHERE token_hash = :token_hash';

        $db = static::getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':token_hash', $this->token_hash, PDO::PARAM_STR);

        $stmt->execute();

    }
}
