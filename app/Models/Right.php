<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Right extends Model
{
    //

    public function roles()
    {

        return $this->belongsToMany(Role::class, 'roles_rights');
    }

    public function staff()
    {

        return $this->belongsToMany(Staff::class, 'staff_rights');
    }
}
