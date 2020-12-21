<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesPositions;
use App\Models\Branch;
use App\Models\Unit;
use App\Models\Position;

class Department extends Model
{
    use ManagesPositions;

    protected $fillable = [
        'title','title_fa','slug'
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
}
