<?php

namespace App\Traits;

use App\Models\Role;
use Utility;

/**
 *
 */
trait CanManageRoles
{
    public function managedByRoles()
    {
        return $this->morphToMany(Role::class, 'role_manager');
    }

    public function setManagerOfRoles($roles)
    {
        $roles = Utility::getAllRoles($roles);
        if ($roles === null) {
            return $this;
        }
        $this->managedByRoles()->attach($roles);
        return $this;
    }
}
