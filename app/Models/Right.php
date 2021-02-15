<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Right extends Model
{
    //
    protected $fillable = [
        'title', 'slug', 'description', 'activation'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'roles_rights');
    }

    public function staff()
    {
        return $this->morphedByMany(Staff::class, 'right_holders');
    }

    public function positions()
    {
        return $this->morphedByMany(Position::class, 'right_holders');
    }
}
