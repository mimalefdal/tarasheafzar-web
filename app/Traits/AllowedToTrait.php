<?php

namespace App\Traits;

use App\Models\Right;
use App\Models\Role;

trait AllowedToTrait
{

    public function giveRightsTo(...$rights)
    {
        $rights = $this->getAllRights($rights);
        dd($rights);
        if ($rights === null) {
            return $this;
        }
        $this->rights()->saveMany($rights);
        return $this;
    }


    public function withdrawRightsTo(...$rights)
    {
        $rights = $this->getAllRights($rights);
        $this->rights()->detach($rights);
        return $this;
    }


    public function refreshRights(...$rights)
    {
        $this->rights()->detach();
        return $this->giveRightsTo($rights);
    }


    public function allowedTo($right)
    {
        return $this->allowedThroughRole($right) || $this->allowed($right);
    }


    public function allowedThroughRole($right)
    {

        foreach ($right->roles as $role) {
            if ($this->roles->contains($role)) {
                return true;
            }
        }
        return false;
    }


    public function hasRole(...$roles)
    {

        foreach ($roles as $role) {
            if ($this->roles->contains('slug', $role)) {
                return true;
            }
        }
        return false;
    }


    public function roles()
    {
        return $this->belongsToMany(Role::class, 'staff_roles');
    }


    public function rights()
    {

        return $this->belongsToMany(Right::class, 'staff_rights');
    }

    public function allRights()
    {
        $roles = $this->roles;
        $role = $roles->first();
        $rightsThrouhRole = $role->rights;
        $rightsIndividual = $this->rights;
        $mergerRights = $rightsThrouhRole->merge($rightsIndividual);
        // dd($mergerRights->toArray());
        // dd($rightsThrouhRole->toArray(), $rightsIndividual->toArray());

        return $mergerRights;
    }

    protected function allowed($right)
    {

        return (bool) $this->rights->where('slug', $right->slug)->count();
    }


    protected function getAllRights(array $rights)
    {
        return Right::whereIn('slug', $rights)->get();
    }
}
