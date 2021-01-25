<?php

namespace App\Models;

use App\Http\Resources\DepartmentItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesPositions;
use App\Models\Branch;
use App\Models\Unit;
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

    //returns type + title(s) of branch object
    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = 'Department';

        $typedName = Bilang::grammertize(Value::getLocalValue($type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
        if ($this->branch != null) {
            $holderTitle = $this->branch->fullTitle($lang);
        } else
            $holderTitle = resolve('Company')->getShortName()[$lang];

        return Bilang::grammertize($typedName, $holderTitle, $lang);
    }

    public function typedTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = 'Department';
        return Bilang::grammertize(Value::getLocalValue($type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
