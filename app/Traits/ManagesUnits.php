<?php

namespace App\Traits;

use App\Models\Unit;

trait ManagesUnits
{
    public function addUnits($units)
    {
        $units = Unit::whereIn('slug', $units)->get();
        return $this->units()->savemany($units);
    }

    public function removeUnits($units)
    {
        $units = Unit::whereIn('slug', $units)->get();
        return $this->units()->detach($units);
    }

    public function refreshUnits($units)
    {
        $this->units()->detach();
        return $this->addUnits($units);
    }

    public function units()
    {
        return $this->morphMany(Unit::class, 'hasunit');
    }
}
