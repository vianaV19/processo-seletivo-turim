<?php

namespace App\Controllers;

use App\Models\Pessoa;
use MF\Controller;

class IndexController extends Controller
{
    public function index()
    {

        $this->view('index');
    }

    public function gravar()
    {
        $json =  json_decode(file_get_contents("php://input"));
        
        $pessoa = new Pessoa();
        $pessoa->__set('pessoas', $json->pessoas);

        $pessoa->gravar();
    }

    public function ler()
    {
        $pessoa = new Pessoa();

        exit($pessoa->ler());
    }
}
