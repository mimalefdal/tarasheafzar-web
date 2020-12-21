<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesPositions;
use App\Models\Department;

class Branch extends Model
{
    use ManagesPositions;

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function setDepartments($departments)
    {
        $this->departments()->saveMany($departments);
    }

}
