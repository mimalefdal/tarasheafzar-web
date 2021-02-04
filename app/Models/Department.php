<?php

namespace App\Models;

use App\Http\Resources\DepartmentItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesPositions;
use App\Models\Branch;
use App\Traits\ChecksUniqueness;
use App\Traits\ManagesUnits;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Department extends Model
{
    use ManagesPositions;
    use ManagesUnits;
    use SoftDeletes;
    use ChecksUniqueness;

    protected $type = 'Department';

    protected $fillable = [
        'title', 'slug', 'deleted_at'
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function setBranch($branch)
    {
        return $this->branch()->associate($branch);
    }

    public function isUnique()
    {
        return $this->unity('branch_id', DepartmentItem::class);
    }

    public function holderTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        if ($this->branch != null) {
            $holderTitle = $this->branch->fullTitle($lang);
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
