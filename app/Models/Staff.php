<?php

namespace App\Models;

use App\Traits\ManagesAccess;
use App\Traits\ManagesRoles;
use App\Traits\ManagesPosition;
use App\Traits\ManagesRights;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use ManagesRights;
    use ManagesRoles;
    use ManagesPosition;
    use ManagesAccess;

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
}
