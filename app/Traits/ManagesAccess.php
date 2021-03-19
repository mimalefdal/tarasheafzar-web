<?php

namespace App\Traits;

use App\Models\Right;

/**
 *
 */
trait ManagesAccess
{
    public function allowedTo($right)
    {
        if ($right instanceof Right)
            return $this->allowed($right);

        if (is_string($right))
            return (bool) $this->allRights()->where('slug', $right)->count();
    }

    protected function allowed($right)
    {
        return (bool) $this->allRights()->where('slug', $right->slug)->count();
    }
}
