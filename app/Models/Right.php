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
        return $this->morphedByMany(Role::class, 'role_holders');
    }

    public function staff()
    {
        return $this->morphedByMany(Staff::class, 'right_holders');
    }

    public function positions()
    {
        return $this->morphedByMany(Position::class, 'right_holders');
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
    // public function isrequiredfor()
    // {
    // }
}
