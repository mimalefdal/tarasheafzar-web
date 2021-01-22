<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Department;
use App\Models\Position;
use App\Traits\ManagesPositions;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Unit extends Model
{
    use ManagesPositions;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'department_id'
    ];

    public function hasunit()
    {
        return $this->morphTo();
    }

    public function setHasUnit($holder)
    {
        return $this->hasunit()->associate($holder);
    }

    // returns type + title(s) of branch object

    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = 'Unit';

        $typedName = Bilang::grammertize(Value::getLocalValue($type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
        if ($this->hasunit != null) {
            $holderTitle = $this->hasunit->fullTitle($lang);
        } else
            $holderTitle = resolve('Company')->getShortName()[$lang];

        return Bilang::grammertize($typedName, $holderTitle, $lang);
    }

    public function typedTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = 'Unit';
        return Bilang::grammertize(Value::getLocalValue($type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
