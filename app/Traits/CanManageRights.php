<?php

namespace App\Traits;

use App\Models\Right;
use Utility;

/**
 * Methos to handle rights managment
 */
trait CanManageRights
{
    public function managedByRights()
    {
        return $this->morphToMany(Right::class, 'right_manager');
    }

    public function managedByRightsThroughRoles()
    {
        if (isset($this->roles)) {
            $roles = $this->allRoles();
            $rightsThrouhRole = collect([]);
            foreach ($roles as $role) {
                $rightsThrouhRole = $rightsThrouhRole->merge($role->managedByRights);
            }
            return $rightsThrouhRole;
        }
        return collect([]);
    }

    public function managedByRightsThroughPosition()
    {
        if (isset($this->position))
            return $this->position->managedByRights;
        return collect([]);
    }

    public function allManagedByRights()
    {
        return $this->managedByRights->merge($this->managedByRightsThroughRoles())->merge($this->managedByRightsThroughPosition());
    }

    public function setManagerOfRights($rights)
    {
        $rights = Utility::getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->managedByRights()->attach($rights);
        return $this;
    }

    public function unsetManagerOfRights($rights)
    {
        $rights = Utility::getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->managedByRights()->detach($rights);
        return $this;
    }
}
