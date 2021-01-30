<?php

namespace App\Models;

use App\Http\Resources\PositionItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesRoles;
use App\Models\JobLevel;
use App\Models\Role;
use App\Traits\ChecksUniqueness;
use App\Traits\HandleBilangTitles;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Position extends Model
{
    use ManagesRoles;
    use SoftDeletes;
    use HandleBilangTitles;
    use ChecksUniqueness;

    protected $fillable = [
        'title', 'slug', 'recruit_capacity'
    ];

    protected $type = 'Position';

    public function hasposition()
    {
        return $this->morphTo();
    }

    public function setHasPosition($holder)
    {
        return $this->hasposition()->associate($holder);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'positions_roles');
    }

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

    public function joblevel()
    {
        return $this->belongsTo(JobLevel::class);
    }

    public function isUnique()
    {
        return $this->unity(['hasposition' => 'morph', 'joblevel_id' => 'column'], PositionItem::class);
    }

    public function holderTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        if ($this->hasposition_id != null) {
            $holderTitle = $this->hasposition->fullTitle($lang);
        } else
            $holderTitle = resolve('Company')->getShortName()[$lang];

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
