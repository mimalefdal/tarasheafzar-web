<?php

namespace App\Models;

use App\Traits\AllowedToTrait;
use App\Traits\ManagesRoles;
use App\Traits\ManagesPosition;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use Notifiable;
    use AllowedToTrait;
    use HasApiTokens;
    use ManagesRoles;
    use ManagesPosition;

    protected $guard = 'staff';

    protected $fillable = [
        'personnel_id', 'username', 'password', 'firstname', 'nickname', 'lastname', 'gender', 'email', 'verification_status', 'national_id', 'idcert_no'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'staff_roles');
    }

    public function rights()
    {
        return $this->belongsToMany(Right::class, 'staff_rights');
    }

    public function rolesThroughPosition()
    {
        // dd($this->position->roles);
        if ($this->position != null) {
            return $this->position->roles;
        }
        return collect([]);
        // return $this->hasManyThrough(Role::class,Position::class);
    }

    public function allRoles()
    {
        return $this->roles->merge($this->rolesThroughPosition());
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
