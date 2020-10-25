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
        $path = base_path().'/public/data/basicStaff.json';

        $basicStaff = file_get_contents($path);
        $basicStaff = json_decode($basicStaff, true);
        foreach($basicStaff as $staff) {
            DB::table('Staff')->insert([
                "personnel_id"=>$staff['personnel_id'],
                "username"=>$staff['username'],
                "password"=>Hash::make($staff['password']),
                "firstname"=>$staff['firstname'],
                "nickname"=>$staff['nickname'],
                "lastname"=>$staff['lastname'],
                "gender"=>$staff['gender'],
                "email"=>$staff['email'],
            ]);
            $newStaff = Staff::where('personnel_id',$staff['personnel_id'])->first();
            $newStaff->setRoles($staff['roles']);
        }


    }
}
