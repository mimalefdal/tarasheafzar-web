<?php

namespace App\Traits;

use App\Models\Role;

trait ManagesRoles
{
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function setRoles($roles) {
        $roles = Role::whereIn('slug',$roles)->get();
        $this->roles()->saveMany($roles);
        return $this;
    }

    public function withdrawRoles($roles) {
        $roles = Role::whereIn('slug',$roles)->get();
        $this->roles()->detach($roles);
        return $this;
    }

    public function refreshRoles($roles) {
        $this->roles()->detach($roles);
        $this->setRoles($roles);
    }
}
