<?php

namespace App\Models;

use App\Traits\AllowedToTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;

    protected $guard = 'admin';

    protected $fillable = [
        'name', 'email', 'username', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
