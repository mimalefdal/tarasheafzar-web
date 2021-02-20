<?php

namespace App\Traits;


/**
 *
 */
trait ManagesAccess
{
    public function allowedTo($right)
    {
        return $this->allowed($right);
        // return $this->allowedThroughRole($right) || $this->allowed($right);
    }

    protected function allowed($right)
    {
        return (bool) $this->allRights()->where('slug', $right->slug)->count();
    }
}
