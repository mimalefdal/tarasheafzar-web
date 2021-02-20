<?php

namespace App\Traits;

use App\Models\Role;

trait ManagesRoles
{
    public function roles()
    {
        return $this->morphToMany(Role::class, 'role_holder');
    }

    public function rolesThroughPosition()
    {
        if (isset($this->position) && $this->position != null) {
            return $this->position->roles;
        }
        return collect([]);
    }

    public function allRoles()
    {
        return $this->roles->merge($this->rolesThroughPosition());
    }

    public function setRoles($roles)
    {
        $roles = $this->getAllRoles($roles);
        $this->roles()->attach($roles);
        return $this;
    }

    public function withdrawRoles($roles)
    {
        $roles = $this->getAllRoles($roles);
        $this->roles()->detach($roles);
        return $this;
    }

    public function refreshRoles($roles)
    {
        $this->roles()->detach($roles);
        $this->setRoles($roles);
    }
}
