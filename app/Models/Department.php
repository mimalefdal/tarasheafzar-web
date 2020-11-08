<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Unit;

class Department extends Model
{
    protected $fillable = [
        'title','title_fa','slug'
    ];

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
