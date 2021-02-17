<?php

namespace App\Traits;

use App\Models\Role;

trait ManagesRoles
{
    public function roles()
    {
        return $this->morphToMany(Role::class, 'role_holder');
    }

    public function ownedRoles()
    {
        return $this->morphToMany(Role::class, 'role_owner');
    }

    public function managedByRoles()
    {
        return $this->morphToMany(Role::class, 'role_manager');
    }

    public function setOwnerOfRoles($roles)
    {
        $roles = $this->getAllRoles($roles);
        if ($roles === null) {
            return $this;
        }
        $this->ownedRoles()->attach($roles);
        return $this;
    }

    public function setManagerOfRoles($roles)
    {
        $roles = $this->getAllRoles($roles);
        if ($roles === null) {
            return $this;
        }
        $this->managedByRoles()->attach($roles);
        return $this;
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

    private function getAllRoles(array $roles)
    {
        return Role::whereIn('slug', $roles)->get();
    }
}
