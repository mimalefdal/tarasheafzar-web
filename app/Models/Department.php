<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Unit;
use App\Traits\ManagesPositions;
use App\Models\Position;

class Department extends Model
{
    use ManagesPositions;

    protected $fillable = [
        'title','title_fa','slug'
    ];

    public function positions()
    {
        return $this->morphMany(Position::class, 'hasposition');
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
}
