<?php

namespace App\Traits;

use App\Models\Right;

/**
 *
 */
trait ManagesRights
{
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

    protected function getAllRights(array $rights)
    {
        return Right::whereIn('slug', $rights)->get();
    }
}
