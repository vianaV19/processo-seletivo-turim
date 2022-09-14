<?php

namespace App\Models;

use App\Connection;

class Pessoa {

    private $pessoas;
    private $db;

    function __construct()
    {
        $conn = new Connection();

        $this->db = $conn->getDb();
    }

    public function __set($name, $value)
    {
        $this->$name = $value;
    }

    public function __get($name)
    {
        return $this->$name;
    }

    public function gravar(){
        foreach($this->pessoas as $pessoa){
            $query = "insert into pessoa (nome) values (?)";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $pessoa->nome);
            
            $stmt->execute();

            $query = "select id from pessoa group by id desc limit 1";

            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $id = $stmt->fetch(\PDO::FETCH_OBJ)->id;

            foreach($pessoa->filhos as $filho){
                $query = "insert into filho (nome, pessoa_id) values (?, ?)";

                $stmt = $this->db->prepare($query);
                $stmt->bindValue(1, $filho);
                $stmt->bindValue(2, $id);

                $stmt->execute();
            }
        }   
    }   

    public function ler(){
        $query = "select * from pessoa ";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $pessoas = $stmt->fetchAll(\PDO::FETCH_OBJ);

        $query = "select * from filho ";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $filhos = $stmt->fetchAll(\PDO::FETCH_OBJ);

        foreach($pessoas as $p){
            $p->filhos = [];
            foreach($filhos as $f){
                if($f->pessoa_id === $p->id){
                     array_push($p->filhos, $f->nome);
                }
            }
        }

        return json_encode($pessoas);
    }
}