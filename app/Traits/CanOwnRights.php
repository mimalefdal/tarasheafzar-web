<?php

namespace App\Traits;

use App\Models\Right;
use Utility;

/**
 * Methos to handle rights owning
 */
trait CanOwnRights
{
    public function ownedRights()
    {
        return $this->morphToMany(Right::class, 'right_owner');
    }

    public function ownedRightsThroughRoles()
    {
        if (isset($this->roles)) {
            $roles = $this->allRoles();
            $rightsThrouhRole = collect([]);
            foreach ($roles as $role) {
                $rightsThrouhRole = $rightsThrouhRole->merge($role->ownedRights);
            }
            return $rightsThrouhRole;
        }
        return collect([]);
    }

    public function ownedRightsThroughPosition()
    {
        if (isset($this->position))
            return $this->position->ownedRights;
        return collect([]);
    }

    public function allOwnedRights()
    {
        return $this->ownedRights->merge($this->ownedRightsThroughRoles())->merge($this->ownedRightsThroughPosition());
        // return $this->ownedRights->merge($this->ownedRightsThroughRoles());
        // return $this->ownedRights;
    }

    public function setOwnerOfRights($rights)
    {
        $rights = Utility::getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->ownedRights()->attach($rights);
        return $this;
    }

    public function unsetOwnerOfRights($rights)
    {
        $rights = Utility::getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->ownedRights()->detach($rights);
        return $this;
    }
}
