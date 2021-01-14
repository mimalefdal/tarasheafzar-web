<?php

namespace App\Models;

use Bilang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Lang;

class Value extends Model
{
    public static function getLocalValue(string $term, string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        if ($lang == 'en')
            return $term;
        else
            return Lang::get('values.' . $term);
    }
}
