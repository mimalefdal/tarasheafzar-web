<?php

namespace App\Traits;

use App\Models\Right;
use Utility;

/**
 * Manages requiredRights for feature, tools & operations
 */
trait ManagesRequiredRights
{
    public function requiredRights()
    {
        return $this->morphToMany(Right::class, 'accessable');
    }

    public function setRequiredRights($rights)
    {
        $rights = Utility::getAllRights($rights);
        $this->requiredRights()->attach($rights);
        return $this;
    }
}
