<?php

namespace App\Traits;

use App\Models\Role;
use Utility;

/**
 *
 */
trait CanOwnRoles
{
    public function ownedRoles()
    {
        return $this->morphToMany(Role::class, 'role_owner');
    }

    public function setOwnerOfRoles($roles)
    {
        $roles = Utility::getAllRoles($roles);
        if ($roles === null) {
            return $this;
        }
        $this->ownedRoles()->attach($roles);
        return $this;
    }
}
