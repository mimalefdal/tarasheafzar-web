<?php

namespace App\Models;

use App\Traits\AllowedToTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use Notifiable;
    use AllowedToTrait;
    use HasApiTokens;

    protected $guard = 'staff';

    protected $fillable = [
        'personnel_id', 'username', 'password', 'firstname', 'nickname', 'lastname','gender', 'email', 'verification_status'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setRoles($roles) {
        $roles = Role::whereIn('slug',$roles)->get();
        $this->roles()->saveMany($roles);
        return $this;
    }

    public function withdrawRoles($roles) {
        $roles = Role::whereIn('slug',$roles)->get();
        $this->roles()->detach($roles);
        return $this;
    }

    public function refreshRoles($roles) {
        $this->roles()->detach($roles);
        $this->setRoles($roles);
    }
}
