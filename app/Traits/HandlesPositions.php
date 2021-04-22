<?php

namespace App\Traits;

use App\Models\Position;

// Handles (assign/modify/retrieve) positions of an structural Block (unit,department,branch or company)
trait HandlesPositions
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

    public function directPositions()
    {
        if (get_class($this) == 'App\Models\Company')
            $positions = Position::where('hasposition_type', null)->get();
        else
            $positions = $this->positions;

        return collect($positions);
    }

    public function subsetPositions(int $deep = 0)
    {
        $positions = collect();

        if (method_exists($this, 'childBlocks')) {
            $positions = collect();
            if ($deep == 0)
                $childBlocks = $this->flatted($this->childblocks());
            foreach ($childBlocks as $block) {
                $positions = $positions->merge($block->directPositions());
            }
        }
        return $positions;
    }

    public function deepPositions(int $deep = 0)
    {
        return $this->directPositions()->merge($this->subsetPositions($deep));
    }
}
