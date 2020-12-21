<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            ValueSeeder::class,
            RightsSeeder::class,
            RolesSeeder::class,
            BranchSeeder::class,
            DepartmentSeeder::class,
            UnitSeeder::class,
            JobLevelSeeder::class,
            PositionSeeder::class,
            StaffSeeder::class,
            ]);
    }
}
