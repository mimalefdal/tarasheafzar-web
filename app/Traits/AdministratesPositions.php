<?php

namespace App\Traits;

use App\Models\Position;

// Administrates position for a structural Block (unit,department,branch or company)
trait AdministratesPositions
{
    public function addPositions($positions)
    {
        $positions = Position::whereIn('slug', $positions)->get();
        return $this->positions()->savemany($positions);
    }

    public function removePositions($positions)
    {
        $positions = Position::whereIn('slug', $positions)->get();
        return $this->positions()->detach($positions);
    }

    public function refreshPositions($positions)
    {
        $this->positions()->detach();
        return $this->addPositions($positions);
    }

    public function positions()
    {
        return $this->morphMany(Position::class, 'hasposition');
    }
}
