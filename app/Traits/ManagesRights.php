<?php

namespace App\Traits;

use App\Models\Right;

/**
 *
 */
trait ManagesRights
{

    // Manages Holders
    public function rights()
    {
        return $this->morphToMany(Right::class, 'right_holder');
    }

    public function giveRightsTo($rights)
    {
        $rights = $this->getAllRights($rights);
        // dd($rights);
        if ($rights === null) {
            return $this;
        }
        $this->rights()->attach($rights);
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

    // Manages Owned
    public function ownedRights()
    {
        return $this->morphToMany(Right::class, 'right_owner');
    }

    public function setOwnerOfRights($rights)
    {
        $rights = $this->getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->ownedRights()->attach($rights);
        return $this;
    }


    // Manages ManagedBy
    public function managedByRights()
    {
        return $this->morphToMany(Right::class, 'right_manager');
    }

    public function setManagerOfRights($rights)
    {
        $rights = $this->getAllRights($rights);
        if ($rights === null) {
            return $this;
        }
        $this->managedByRights()->attach($rights);
        return $this;
    }

    // other methods
    protected function getAllRights(array $rights)
    {
        return Right::whereIn('slug', $rights)->get();
    }
}
