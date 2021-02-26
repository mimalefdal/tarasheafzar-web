<?php

namespace App\Models;

use App\Traits\CanManageRights;
use App\Traits\CanOwnRights;
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
    use CanOwnRights;
    use CanManageRights;

    protected $guard = 'staff';

    protected $fillable = [
        'personnel_id', 'username', 'password', 'firstname', 'nickname', 'lastname', 'gender', 'email', 'verification_status', 'national_id', 'idcert_no'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'title' => 'array'
    ];

    public function scope()
    {
        $position = $this->position;
        $joblevel = $position->joblevel;
        // $holderBlock = $position->hasposition == null ? resolve('Company') : $position->hasposition;
        $holderBlock = $position->hasposition;

        if ($holderBlock != null) {
            $holderBlock['class'] = $position->hasposition_type;
        } else {
            $holderBlock = resolve('Company')->make();
            $holderBlock['class'] = get_class(resolve('Company'));
        }

        // return ['joblevel' => $joblevel, 'holder' => $holderBlock];

        if (method_exists($holderBlock, 'childBlocks')) {
            $childBlocks = $holderBlock->childBlocks();
            return ['joblevel' => $joblevel, 'holder' => $holderBlock, 'childBlocks' => $childBlocks];
        }
        return ['joblevel' => $joblevel, 'holder' => $holderBlock];
    }
}
