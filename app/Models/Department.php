<?php

namespace App\Models;

use App\Http\Resources\DepartmentItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HandlesPositions;
use App\Models\Branch;
use App\Traits\ChecksUniqueness;
use App\Traits\HandlesChildBlocks;
use App\Traits\HandlesCrew;
use App\Traits\ManagesUnits;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Department extends Model
{
    use ChecksUniqueness;
    use SoftDeletes;
    use ManagesUnits;
    use HandlesPositions;
    use HandlesChildBlocks;
    use HandlesCrew;

    protected $type = 'Department';

    protected $fillable = [
        'title', 'slug', 'deleted_at'
    ];

    protected $casts = [
        'title' => 'array',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class)->with('departments', 'units');
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
