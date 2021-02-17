<?php

namespace App\Traits;


/**
 *
 */
trait ManagesAccess
{
    public function allRights()
    {
        $roles = $this->allRoles();
        $rightsThrouhRole = collect([]);
        foreach ($roles as $role) {
            $rightsThrouhRole = $rightsThrouhRole->merge($role->rights);
        }

        $rightsThrouhPosition = collect([]);
        if (isset($this->position))
            $rightsThrouhPosition = $this->position->rights;

        $rightsIndividual = $this->rights;

        $allRights = $rightsThrouhRole->merge($rightsIndividual)->merge($rightsThrouhPosition);
        return $allRights;
    }

    public function allowedTo($right)
    {
        return $this->allowed($right);
        // return $this->allowedThroughRole($right) || $this->allowed($right);
    }

    protected function allowed($right)
    {
        return (bool) $this->rights->where('slug', $right->slug)->count();
    }

    public function rolesThroughPosition()
    {
        // dd($this->position->roles);
        if ($this->position != null) {
            return $this->position->roles;
        }
        return collect([]);
        // return $this->hasManyThrough(Role::class,Position::class);
    }

    public function allRoles()
    {
        return $this->roles->merge($this->rolesThroughPosition());
    }
}
