<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ManagesRoles;
use App\Models\JobLevel;
use App\Models\Role;


class Position extends Model
{
    use ManagesRoles;

    protected $fillable = [
        'title', 'title_fa','slug','recruit_capacity'
    ];

    public function hasposition()
    {
        return $this->morphTo();
    }

    public function setHasPosition($holder)
    {
        return $this->hasposition()->associate($holder);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class,'positions_roles');
    }

    public function staff() {
        return $this->hasMany(Staff::class);
    }

    public function joblevel()
    {
        return $this->belongsTo(JobLevel::class);
    }
}
