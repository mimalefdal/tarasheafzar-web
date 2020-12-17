<?php

namespace App\Traits;

use App\Models\Position;

trait ManagesPositions
{
public function addPositions($positions)
    {
        $positions = Position::whereIn('slug',$positions)->get();
        return $this->positions()->savemany($positions);
    }

    public function removePosition($positions)
    {
        $positions = Position::whereIn('slug',$positions)->get();
        return $this->positions()->detach($positions);
    }

    public function refreshPositions($positions)
    {
       $this->positions()->detach();
       return $this->addPositions($positions);
    }

    public function position() {
        return $this->belongsTo(Position::class);
    }
}
