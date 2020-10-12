<?php

namespace App\Traits;

use App\Models\Right;
use App\Models\Role;

trait ManagesRoleRights
{

    public function giveRightsTo($rights)
    {
        $rights = $this->getAllRights($rights);
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
        return $this->allowed($right);
    }

    // public function rights()
    // {
    //     return $this->hasMany(Right::class, 'roles_rights');
    // }

    public function allRights()
    {
        $rightsIndividual = $this->rights;
        return $rightsIndividual;
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
