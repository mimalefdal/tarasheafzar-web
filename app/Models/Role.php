<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesRoleRights;


class Role extends Model
{
    //
    use ManagesRoleRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'title_fa'
    ];
    public function rights()
    {
        return $this->belongsToMany(Right::class, 'roles_rights');
    }

    public function staff()
    {
        return $this->belongsTomany(Staff::class, 'staff_roles');
    }


}
