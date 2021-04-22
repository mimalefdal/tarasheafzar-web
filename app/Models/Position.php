<?php

namespace App\Models;

use App\Http\Resources\PositionItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ChecksUniqueness;
use App\Traits\ManagesRights;
use App\Traits\ManagesRoles;
use App\Models\Joblevel;
use App\Traits\CanManageRights;
use App\Traits\CanManageRoles;
use App\Traits\CanOwnRights;
use App\Traits\CanOwnRoles;
use App\Traits\HandleBilangTitles;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Position extends Model
{
    use ChecksUniqueness;
    use ManagesRights;
    use ManagesRoles;
    use CanOwnRights;
    use CanOwnRoles;
    use CanManageRights;
    use CanManageRoles;
    use SoftDeletes;
    use HandleBilangTitles;

    protected $fillable = [
        'title', 'display_title', 'slug', 'recruit_capacity'
    ];

    protected $casts = [
        'title' => 'array',
        'display_title' => 'array',
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

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

    public function joblevel()
    {
        return $this->belongsTo(Joblevel::class);
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
            $holderTitle = resolve('Company')->shortTitle();

        return $holderTitle;
    }

    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize($this->levelTitle($lang), $this->holderTitle($lang), $lang);
    }

    public function displayTitle(string $lang = null)
    {
        if ($this->display_title != null) {
            if (!$lang) $lang = Lang::getLocale();
            return Bilang::grammertize(Bilang::getLocalTitle($this->display_title, true, $lang), $this->holderTitle($lang), $lang);
        }
        return null;
    }

    public function typedTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize(Value::getLocalValue($this->type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }

    public function levelTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize(Bilang::getLocalTitle($this->joblevel->title, false, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
