<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Department;
use App\Models\Position;
use App\Traits\ManagesPositions;

class Unit extends Model
{
    use ManagesPositions;

    protected $fillable = [
        'title','title_fa','slug','department_id'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function positions()
    {
        return $this->morphMany(Position::class, 'hasposition');
    }
}
