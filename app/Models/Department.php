<?php

namespace App\Models;

use App\Http\Resources\DepartmentItem;
use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesPositions;
use App\Models\Branch;
use App\Models\Unit;
use App\Models\Position;
use App\Traits\ChecksUniqueness;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;
use stdClass;

class Department extends Model
{
    use ManagesPositions;
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

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    public function setUnits($units)
    {
        $this->units()->saveMany($units);
    }

    public function removeUnits($units)
    {
        $this->units()->detach($units);
    }

    public function isUnique()
    {
        return Bilang::isUnique($this, 'branch_id', DepartmentItem::class);
    }

    //returns type + title(s) of branch object
    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = 'Department';

        return Bilang::grammertize(Value::getLocalValue($type, $lang), Bilang::getLocalTitle($this->title, $lang));
    }
}
