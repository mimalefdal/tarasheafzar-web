<?php

namespace App\Traits;

use App\Models\Staff;
use Illuminate\Support\Facades\Hash;

/**
 *
 */
trait ControlsStaff
{
    public function createStaff(array $staffArray)
    {

        foreach ($staffArray as $staff) {
            // dump($staff);
            $newStaff = new Staff([
                "personnel_id" => $staff['personnel_id'],
                "username" => $staff['username'],
                "password" => Hash::make($staff['password']),
                "firstname" => $staff['firstname'],
                "nickname" => $staff['nickname'],
                "lastname" => $staff['lastname'],
                "national_id" => $staff['national_id'],
                "idcert_no" => $staff['idcert_no'],
                "gender" => $staff['gender'],
                "email" => $staff['email'],
            ]);
            $newStaff->save();

            if ($staff['rights'] != null) {
                $newStaff->giveRightsTo($staff['rights']);
            }

            if ($staff['roles'] != null) {
                $newStaff->setRoles($staff['roles']);
            }

            if ($staff['position'] != null) {
                $newStaff->setPosition($staff['position']);
            }

            $newStaff->save();
        }
    }
}
