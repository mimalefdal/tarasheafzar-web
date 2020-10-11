<?php

use Illuminate\Database\Seeder;
use App\Models\Staff;
class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    factory(Staff::class)->create([
        'personnel_id'=>'8518',
        'username'=>'mimalefdal',
        'password'=>Hash::make('amin8518'),
        'firstname'=>'محمدامین',
        'nickname'=>'دلوار',
        'lastname'=>'دلورانی',
        'email'=>'mimalefdal@yahoo.com',
    ]);

    }
}
