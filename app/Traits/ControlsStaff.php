<?php

namespace App\Traits;

use App\Models\Right;
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
                if ($staff['rights'][0] == "allRights")
                    $rights_ = Right::pluck('slug')->all();
                else
                    $rights_ = $staff['rights'];
                $newStaff->giveRightsTo($rights_);
            }

            if (isset($staff['ownedRights']) && $staff['ownedRights'] != null) {
                if ($staff['ownedRights'][0] == "allRights") {
                    $ownedRights_ = Right::pluck('slug')->all();
                } else {
                    $ownedRights_ = $staff['ownedRights'];
                }
                $newStaff->setOwnerOfRights($ownedRights_);
            }

            if (isset($staff['managedByRights']) && $staff['managedByRights'] != null) {
                if ($staff['managedByRights'][0] == "allRights") {
                    $managedByRights_ = Right::pluck('slug')->all();
                } else {
                    $managedByRights_ = $staff['managedByRights'];
                }
                $newStaff->setOwnerOfRights($managedByRights_);
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
