<?php

namespace App\Traits;

use App\Models\Branch;
use App\Models\Department;
use App\Models\Joblevel;
use App\Models\Position;
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
            Validator::make($position, ['slug' => 'required|unique:positions'])->validate();

            $newItem = new Position(Arr::only($position, ['slug', 'title', 'display_title', 'recruit_capacity']));
            $newItem->title = json_encode($position['title']);
            $newItem->display_title = json_encode($position['display_title']);
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
                $newItem->giveRightsTo($position['rights']);
            }

            if (isset($position['ownedRights']) && $position['ownedRights'] != null) {
                $newItem->setOwnerOfRights($position['ownedRights']);
            }

            if (isset($position['managedByRights']) && $position['managedByRights'] != null) {
                $newItem->setManagerOfRights($position['managedByRights']);
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
