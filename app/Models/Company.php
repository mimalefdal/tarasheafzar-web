<?php

namespace App\Models;

use App\Traits\HandlesChildBlocks;
use App\Traits\HandlesCrew;
use Bilang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Lang;

class Company extends Model
{

    use HandlesChildBlocks;
    use HandlesCrew;

    protected $name;
    protected $shortName;
    protected $CompanyTitle;

    public function __construct()
    {
        $this->shortName = ["fa" => 'تراشه‌افزار', "en" => 'Tarashe Afzar'];
        $this->name = ["fa" => 'تراشه افزار سامانه ایرانیان', "en" => 'Tarashe Afzar Samaneh Iranian'];
        $this->CompanyTitle = ["fa" => 'شرکت', "en" => 'Company'];
    }

    public function branches()
    {
        return Branch::with('departments', 'units')->get();
    }

    public function departments()
    {
        return Department::where('branch_id', null)->with('units')->get();
    }

    public function units()
    {
        return Unit::where('hasunit_type', null)->get();
    }

    public function positions()
    {
        return Position::where('hasposition_type', null)->get();
    }

    public function get()
    {
        return $this;
    }

    public function shortTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        return $this->shortName[$lang];
    }

    public function getName()
    {
        return $this->name;
    }

    public function getCompanyTitle()
    {
        return $this->CompanyTitle;
    }

    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = $this->CompanyTitle;

        return Bilang::grammertize($type[$lang], Bilang::getLocalTitle($this->name, false, $lang), $lang);
    }
}
