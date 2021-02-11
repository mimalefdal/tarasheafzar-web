<?php

namespace App\Traits;

use App\Models\Branch;
use App\Models\Department;
use App\Models\Joblevel;
use App\Models\Position;
use App\Models\Unit;
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

            $newItem = new Position($position);
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

            if ($position['roles'] != null) {
                $newItem->setRoles($position['roles']);
            }
        }
    }
}
