<?php

namespace App\Traits;

use App\Models\Right;
use Utility;

/**
 * Manages Rights for staff,position or role object
 */
trait ManagesRights
{
    // Retrieve Rights
    public function rights()
    {
        return $this->morphToMany(Right::class, 'right_holder');
    }

    public function rightsThroughRoles()
    {
        if (isset($this->roles)) {
            $roles = $this->allRoles();
            $rightsThrouhRole = collect([]);
            foreach ($roles as $role) {
                $rightsThrouhRole = $rightsThrouhRole->merge($role->rights);
            }
            return $rightsThrouhRole;
        }
        return collect([]);
    }

    public function rightsThroughPosition()
    {
        if (isset($this->position))
            return $this->position->rights;
        return collect([]);
    }

    public function allRights($seperated = false)
    {
        return $this->rights->merge($this->rightsThroughPosition())->merge($this->rightsThroughRoles());
    }



    // Manage Rights
    public function giveRightsTo($rights)
    {
        $rights = Utility::getAllRights($rights);
        // dd($rights);
        if ($rights === null) {
            return $this;
        }
        $this->rights()->attach($rights);
        return $this;
    }

    public function withdrawRightsTo($rights)
    {
        $rights = Utility::getAllRights($rights);
        $this->rights()->detach($rights);
        return $this;
    }

    public function refreshRights($rights)
    {
        $this->rights()->detach();
        return $this->giveRightsTo($rights);
    }
}
