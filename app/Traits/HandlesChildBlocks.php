<?php

namespace App\Traits;

use stdClass;

/**
 * Handles Child Block of an orgaziation block Models (Company,Branch,Department)
 */
trait HandlesChildBlocks
{

    public function childBlocks()
    {
        $childBlocks = [];
        if ($this->childBranches() != [])
            $childBlocks['branch'] = $this->childBranches();

        if ($this->childDepartments() != [])
            $childBlocks['department'] = $this->childDepartments();

        if ($this->childUnits() != [])
            $childBlocks['unit'] = $this->childUnits();

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


    /**
     * Create all-deep childblocks of input blocks.
     *
     * @param  Array  $blocks
     * @return Array
     */
    public static function flatted($blocks)
    {
        $flatted = [];

        foreach ($blocks as $type => $subblocks) {
            foreach ($subblocks as $block) {
                array_push($flatted, $block);
                if (method_exists($block, 'childBlocks'))
                    $flatted = array_merge($flatted, $block->flatted($block->childBlocks()));
            }
        }
        return $flatted;
    }

    private static function flatten($block)
    {
        // $flattened = ['type' => $type, 'slug' => $block->slug, 'block' => $block];
    }
}
