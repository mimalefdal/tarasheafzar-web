<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Right extends Model
{
    //
    protected $fillable = [
        'title', 'slug', 'description', 'activation'
    ];

    protected $casts = [
        'title' => 'array',
    ];

    public function roles()
    {
        return $this->morphedByMany(Role::class, 'role_holder');
    }

    public function staff()
    {
        return $this->morphedByMany(Staff::class, 'right_holder');
    }

    public function positions()
    {
        return $this->morphedByMany(Position::class, 'right_holder');
    }

    public function parent()
    {
        return $this->belongsTo(Right::class, 'parent_id');
    }

    public function isParent()
    {
        return (bool) $this->parent_id == null;
    }

    public function children()
    {
        return $this->hasMany(Right::class, 'parent_id');
    }
}
