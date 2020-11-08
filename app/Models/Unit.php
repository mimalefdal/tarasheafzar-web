<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Role;
use App\Models\Department;

class Unit extends Model
{
    protected $fillable = [
        'title','title_fa','slug','department_id'
    ];

    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    // public function department()
    // {
    //     return $this->belongsTo(Department::class);
    // }

    // public function setDepartment($department)
    // {
    //     $this->department()->associate($department);
    //     $this->save();
    // }
    // public function removefromDepartment($department)
    // {
    //     $this->department()->dissociate($department);
    //     $this->save();
    // }

    public function addRoles($roles)
    {
        return $this->roles()->saveMany($roles);
    }

    public function removeRoles($roles)
    {
        return $this->roles()->detach($roles);
    }

    public function refreshRoles($roles)
    {
       $this->roles()->detach();
       return $this->addRoles($roles);

    }


}
