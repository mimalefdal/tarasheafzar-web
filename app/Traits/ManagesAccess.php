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

    public function allowedTo($right)
    {
        return $this->allowed($right);
        // return $this->allowedThroughRole($right) || $this->allowed($right);
    }

    protected function allowed($right)
    {
        return (bool) $this->rights->where('slug', $right->slug)->count();
    }
}
