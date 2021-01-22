<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $name;
    protected $shortName;
    protected $CompanyTitle;

    public function __construct()
    {
        $this->shortName = ["fa" => 'تراشه‌افزار', "en" => 'Tarashe Afzar'];
        $this->name = ["fa" => 'تراشه افزار سامانه ایرانیان', "en" => 'Tarashe Afzar Samaneh Iranian'];
        $this->CompanyTitle = ["fa" => 'شرکت', "en" => 'Company'];
    }

    public function get()
    {
        return $this;
    }

    public function getShortName()
    {
        return $this->shortName;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getCompanyTitle()
    {
        return $this->CompanyTitle;
    }
}
