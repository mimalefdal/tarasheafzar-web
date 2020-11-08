<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesRoleRights;
use App\Models\Unit;


class Role extends Model
{
    //
    use ManagesRoleRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'title_fa','unit_id'
    ];
    public function rights()
    {
        return $this->belongsToMany(Right::class, 'roles_rights');
    }

    public function staff()
    {
        return $this->belongsToMany(Staff::class, 'staff_roles');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }


}
