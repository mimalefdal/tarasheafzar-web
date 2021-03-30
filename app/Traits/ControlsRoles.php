<?php

namespace App\Traits;

use App\Models\Right;
use App\Models\Role;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsRoles
{
    public function createRoles(array $roles)
    {
        foreach ($roles as $role) {
            Validator::make($role, ['slug' => 'required|unique:roles'])->validate();

            $newItem = new Role(Arr::only($role, ['slug', 'title', 'activation', 'description']));
            // $newItem->title = json_encode($role['title']);
            $newItem->save();

            if ($role['rights'] != null) {
                if ($role['rights'][0] == "allRights") {
                    $rights_ = Right::pluck('slug')->all();
                } else {
                    $rights_ = $role['rights'];
                }
                $newItem->giveRightsTo($rights_);
            }

            if (isset($role['ownedRights']) && $role['ownedRights'] != null) {
                if ($role['ownedRights'][0] == "allRights") {
                    $ownedRights_ = Right::pluck('slug')->all();
                } else {
                    $ownedRights_ = $role['ownedRights'];
                }
                $newItem->setOwnerOfRights($ownedRights_);
            }

            if (isset($role['managedByRights']) && $role['managedByRights'] != null) {
                if ($role['managedByRights'][0] == "allRights") {
                    $managedByRights_ = Right::pluck('slug')->all();
                } else {
                    $managedByRights_ = $role['managedByRights'];
                }
                $newItem->setOwnerOfRights($managedByRights_);
            }
        }
    }
}
