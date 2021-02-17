<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Position;
use App\Traits\ManagesRights;

class Role extends Model
{
    use ManagesRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'unit_id'
    ];

    public function staff()
    {
        return $this->morphedByMany(Staff::class, 'roles_holders');
    }

    public function positions()
    {
        return $this->morphedByMany(Position::class, 'roles_holders');
    }
}
