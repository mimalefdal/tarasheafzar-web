<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\ManagesPositions;
use App\Models\Department;
use App\Traits\ChecksUniqueness;
use App\Http\Resources\BranchItem;
use Bilang;
use Illuminate\Support\Facades\Lang;

class Branch extends Model
{
    use ManagesPositions;
    use ChecksUniqueness;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'type', 'deleted_at'
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
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

        return Bilang::grammertize(Value::getLocalValue($type->title, $lang), Bilang::getLocalTitle($this->title, false, $lang));
    }
}
