<?php

namespace App\Models;

class Incomes extends \Core\Model
{

    public static function getAll()
    {

        try {

            $db = static::getDB();

            $stmt = $db->query('SELECT * FROM incomes');    //for now fetching all, later, after adding login form, add WHERE 
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
