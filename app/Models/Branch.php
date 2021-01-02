<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\ManagesPositions;
use App\Models\Department;
use stdClass;
use App\Traits\ChecksUniqueness;
use App\Http\Resources\BranchItem;

class Branch extends Model
{
    use ManagesPositions;
    use ChecksUniqueness;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'type'
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
        $isUnique = new stdClass();
        $isNamedUnique = $this->isNamedUnique();

        if ($isNamedUnique == null) {
            $isUnique->check = true;
        } else {
            $isUnique->check = false;

            // Transform matched item to api resource
            foreach ($isNamedUnique as $key => &$error) {
                $error['item'] = new BranchItem($error['item']);
            }

            $isUnique->errors = $isNamedUnique;
        }

        return $isUnique;
    }
}
