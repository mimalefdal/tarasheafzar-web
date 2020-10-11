<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //

    public function rights()
    {
        return $this->belongsToMany(Right::class, 'roles_rights');
    }

    public function staff()
    {
        return $this->belongsTomany(Staff::class, 'staff_roles');
    }
}
