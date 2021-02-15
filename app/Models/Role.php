<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesRoleRights;
use App\Models\Position;
use App\Traits\ManagesAccess;
use App\Traits\ManagesRights;

class Role extends Model
{
    //
    // use ManagesRoleRights;
    use ManagesRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'unit_id'
    ];

    public function staff()
    {
        return $this->belongsToMany(Staff::class, 'staff_roles');
    }

    public function positions()
    {
        return $this->belongsToMany(Position::class, 'positions_roles');
    }
}
