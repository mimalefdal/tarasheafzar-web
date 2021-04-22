<?php

namespace App\Models;

use App\Http\Resources\UnitItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ChecksUniqueness;
use App\Traits\HandlesPositions;
use App\Traits\HandlesCrew;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;
use Bilang;

class Unit extends Model
{
    use HandlesPositions;
    use SoftDeletes;
    use ChecksUniqueness;

    use HandlesCrew;

    protected $type = 'Unit';

    protected $fillable = [
        'title', 'slug', 'department_id'
    ];

    protected $casts = [
        'title' => 'array',
    ];

    public function hasunit()
    {
        return $this->morphTo();
    }

    public function setHasUnit($holder)
    {
        return $this->hasunit()->associate($holder);
    }

    public function isUnique()
    {
        return $this->unity(['hasunit' => 'morph'], UnitItem::class, true);
    }

    public function holderTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        if ($this->hasunit_id != null) {
            $holderTitle = $this->hasunit->fullTitle($lang);
        } else
            $holderTitle = resolve('Company')->shortTitle();

        return $holderTitle;
    }

    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize($this->typedTitle($lang), $this->holderTitle($lang), $lang);
    }

    public function typedTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize(Value::getLocalValue($this->type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
