<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CompanyController extends Controller
{
    protected $name;

    public function __constructor($name)
    {
        $this->name = $name;
    }

    public function info()
    {
        return $this->name;
    }
}
