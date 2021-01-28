<?php

namespace App\Traits;

use App\Models\Position;

trait ManagesPositions
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
