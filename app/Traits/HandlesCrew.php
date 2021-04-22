<?php

namespace App\Traits;

use App\Models\Staff;
use Illuminate\Database\Eloquent\Builder;

/**
 * Handles Crew for organization blocks(Company,Branch,Department,unit)
 */
trait HandlesCrew
{
    public function directCrew()
    {
        if (get_class($this) == 'App\Models\Company')
            $crew = Staff::whereHas('position',  function (Builder $query) {
                return $query->where('hasposition_type', null);
            })->get();
        else
            $crew = Staff::whereHas('position', function (Builder $query) {
                return $query->whereHasMorph('hasposition', '*', function (Builder $query) {
                    return $query->where('slug', $this->slug);
                });
            })->get();

        return $crew;
    }

    public function subsetCrew(int $deep = 0)
    {
        $crew = collect();

        if (method_exists($this, 'childBlocks')) {
            $crew = collect();
            if ($deep == 0)
                $childBlocks = $this->flatted($this->childblocks());
            foreach ($childBlocks as $block) {
                $crew = $crew->merge($block->directCrew());
            }
        }
        return $crew;
    }

    public function deepCrew(int $deep = 0)
    {
        return $this->directCrew()->merge($this->subsetCrew($deep));
    }
}
