<?php

namespace App\Models;

use App\Traits\AllowedToTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Staff extends Authenticatable
{
    use Notifiable;
    use AllowedToTrait;

    protected $guard = 'staff';

    protected $fillable = [
        'personnel_id', 'username', 'password', 'firstname', 'nickname', 'lastname', 'email', 'verification_status'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
