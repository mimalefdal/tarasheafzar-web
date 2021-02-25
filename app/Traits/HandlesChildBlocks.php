<?php

namespace App\Traits;

use App\Http\Resources\BlockItem;
use App\Http\Resources\BranchItem;
use App\Models\Branch;
use Illuminate\Support\Arr;

/**
 * Handles Child Block og a Block (Company,Branch,Department)
 */
trait HandlesChildBlocks
{

    public function childBlocks()
    {
        $childBlocks = [];
        if ($this->childBranches() != [])
            $childBlocks['branches'] = $this->childBranches();

        if ($this->childDepartments() != [])
            $childBlocks['departments'] = $this->childDepartments();

        if ($this->childUnits() != [])
            $childBlocks['units'] = $this->childUnits();

        return $childBlocks;
    }

    public function childBranches()
    {
        if (method_exists($this, 'branches')) {
            if (get_class($this) == 'App\Models\Company')
                return $this->branches();
            return $this->branches;
        }

        return [];
    }

    public function childDepartments()
    {
        if (method_exists($this, 'departments')) {
            if (get_class($this) == 'App\Models\Company')
                return $this->departments();
            return $this->departments;
        }
        return [];
    }

    public function childUnits()
    {
        if (method_exists($this, 'units')) {
            if (get_class($this) == 'App\Models\Company')
                return $this->units();
            return $this->units;
        }
        return [];
    }
}
