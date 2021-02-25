<?php

namespace App\Models;

use Bilang;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Resources\BranchItem;
use App\Models\Department;
use App\Traits\AdministratesPositions;
use App\Traits\ChecksUniqueness;
use App\Traits\HandlesChildBlocks;
use App\Traits\ManagesUnits;

class Branch extends Model
{
    use AdministratesPositions;
    use ManagesUnits;
    use ChecksUniqueness;
    use SoftDeletes;
    use HandlesChildBlocks;

    protected $fillable = [
        'title', 'slug', 'type', 'deleted_at'
    ];

    public function departments()
    {
        return $this->hasMany(Department::class)->with('units');
    }

    public function setDepartments($departments)
    {
        $this->departments()->saveMany($departments);
    }

    public function isUnique()
    {
        return $this->unity('type', BranchItem::class);
    }

    //returns type + title(s) of branch object
    public function fullTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        $type = Value::where('field', 'branchtypes')->where('slug', $this->type)->first();

        return Bilang::grammertize(Value::getLocalValue($type->title, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
