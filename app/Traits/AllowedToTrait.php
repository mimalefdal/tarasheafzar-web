<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use App\Models\Right;
use App\Models\Role;
use App\Models\Position;

trait AllowedToTrait
{

    public function giveRightsTo($rights)
    {
        $rights = $this->getAllRights($rights);
        // dd($rights);
        if ($rights === null) {
            return $this;
        }
        $this->rights()->saveMany($rights);
        return $this;
    }


    public function withdrawRightsTo($rights)
    {
        $rights = $this->getAllRights($rights);
        $this->rights()->detach($rights);
        return $this;
    }


    public function refreshRights($rights)
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

    public function hasAnyOfRoles($roles)
    {

        foreach ($roles as $role) {
            if ($this->roles->contains('slug', $role)) {
                return true;
            }
        }
        return false;
    }

    public function allRights()
    {
        $roles = $this->allRoles();
        // dd($roles->toArray());
        // $role = $roles->first();
        // $rightsThrouhRole = $role->rights;
        $rightsThrouhRole = collect([]);
        foreach ($roles as $role) {
            $rightsThrouhRole = $rightsThrouhRole->merge($role->rights);
        }
        $rightsIndividual = $this->rights;
        $allRights = $rightsThrouhRole->merge($rightsIndividual);
        // dd($allRights->toArray());
        // dd($rightsThrouhRole->toArray(), $rightsIndividual->toArray());

        return $allRights;
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    protected function allowed($right)
    {
        return (bool) $this->rights->where('slug', $right->slug)->count();
    }

    public function rights()
    {
        return $this->belongsToMany(Right::class);
    }
    protected function getAllRights(array $rights)
    {
        return Right::whereIn('slug', $rights)->get();
    }
}
