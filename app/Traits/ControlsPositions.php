<?php

namespace App\Traits;

use App\Models\Branch;
use App\Models\Department;
use App\Models\Joblevel;
use App\Models\Position;
use App\Models\Right;
use App\Models\Unit;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsPositions
{
    public function createPositions(array $positions)
    {
        foreach ($positions as $position) {
            // dump($position);

            Validator::make($position, ['slug' => 'required|unique:positions'])->validate();

            $newItem = new Position(Arr::only($position, ['slug', 'title', 'display_title', 'recruit_capacity']));
            $newItem->save();
            if ($position['holderType'] != null) {
                switch ($position['holderType']) {
                    case 'branch':
                        $hasposition = Branch::where('slug', $position['holder'])->firstorfail();
                        break;

                    case 'department':
                        $hasposition = Department::where('slug', $position['holder'])->firstorfail();
                        break;

                    case 'unit':
                        $hasposition = Unit::where('slug', $position['holder'])->firstorfail();
                        break;

                    default:
                        // $hasposition = resolve('Company');
                        $hasposition = null;
                        break;
                }
                // dump(get_class($hasposition));
                $newItem->setHasPosition($hasposition)->save();
            }

            if ($position['job-level'] != null) {
                $jobLevel = Joblevel::where('slug', $position['job-level'])->first();
                $jobLevel->positions()->save($newItem);
            }

            if ($position['rights'] != null) {
                if ($position['rights'][0] == "allRights")
                    $rights_ = Right::pluck('slug')->all();
                else
                    $rights_ = $position['rights'];
                $newItem->giveRightsTo($rights_);
            }

            if (isset($position['ownedRights']) && $position['ownedRights'] != null) {
                if ($position['ownedRights'][0] == "allRights")
                    $ownedRights_ = Right::pluck('slug')->all();
                else
                    $ownedRights_ = $position['ownedRights'];
                $newItem->setOwnerOfRights($ownedRights_);
            }

            if (isset($position['managedByRights']) && $position['managedByRights'] != null) {
                if ($position['managedByRights'][0] == "allRights")
                    $managedByRights_ = Right::pluck('slug')->all();
                else
                    $managedByRights_ = $position['managedByRights'];
                $newItem->setManagerOfRights($managedByRights_);
            }

            if ($position['roles'] != null) {
                $newItem->setRoles($position['roles']);
            }

            if (isset($position['ownedRoles']) && $position['ownedRoles'] != null) {
                $newItem->setOwnerOfRoles($position['ownedRoles']);
            }

            if (isset($position['managedByRoles']) && $position['managedByRoles'] != null) {
                $newItem->setManagerOfRoles($position['managedByRoles']);
            }
        }
    }
}
