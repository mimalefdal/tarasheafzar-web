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
            $newItem->title = json_encode($role['title']);
            $newItem->save();

            if ($role['rights'] != null) {
                if ($role['rights'][0] == "allRights") {
                    $rights = Right::all()->pluck('slug')->all();
                } else {
                    $rights = $role['rights'];
                }
                $newItem->giveRightsTo($rights);
            }
        }
    }
}
