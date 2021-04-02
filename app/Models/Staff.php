<?php

namespace App\Models;

use App\Traits\CanManageRights;
use App\Traits\CanOwnRights;
use App\Traits\ManagesAccess;
use App\Traits\ManagesRoles;
use App\Traits\ManagesPosition;
use App\Traits\ManagesRights;
use Auth;
use Illuminate\Database\Eloquent\SoftDeletes;
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
    use SoftDeletes;

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

    public function getFullNameAttribute()
    {
        return "{$this->firstname} {$this->lastname}";
    }

    public function holder()
    {
        if ($this->position->hasposition == null)
            return resolve('Company');
        return $this->position->hasposition;
    }

    public function crewScope($mode = 'all')
    {
        switch ($mode) {
            case null:
                $targetCrew = collect([]);
                break;

            case 'all':
                // $targetCrew = $this->holder()->directCrew()->merge($this->holder()->subsetCrew());
                $targetCrew = $this->holder()->wholeCrew();
                // $targetCrew = $targetCrew->sortBy('idcert_no');
                break;

            case 'direct':
                $targetCrew = $this->holder()->directCrew();
                break;

            case 'subset':
                $targetCrew = $this->holder()->subsetCrew();
                break;
            default:
                # code...
                break;
        }
        // return $targetCrew;
        $crewScope = $targetCrew->filter(function ($value, $key) {
            return $value->position->joblevel->priority > $this->position->joblevel->priority;
        });


        return $crewScope;
    }
}
