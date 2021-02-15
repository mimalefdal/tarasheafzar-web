<?php

use Illuminate\Database\Seeder;
use App\Models\Staff;
use App\Models\Role;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $path = Storage::disk('public')->path('basicStaff.json');
        $path = base_path() . '/public/data/basicStaff.json';

        $basicStaff = file_get_contents($path);
        $basicStaff = json_decode($basicStaff, true);
        foreach ($basicStaff as $staff) {

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
        }
    }
}
