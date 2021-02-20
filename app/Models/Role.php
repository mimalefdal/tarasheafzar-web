<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Position;
use App\Traits\CanManageRights;
use App\Traits\CanOwnRights;
use App\Traits\ManagesRights;

class Role extends Model
{
    use ManagesRights;
    use CanOwnRights;
    use CanManageRights;

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
