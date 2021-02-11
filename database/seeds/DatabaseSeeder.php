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
            FeaturesSeeder::class,
            ToolsSeeder::class,
            RightsSeeder::class,
            RolesSeeder::class,
            // BranchSeeder::class,
            // DepartmentSeeder::class,
            // UnitSeeder::class,
            joblevelSeeder::class,
            // PositionSeeder::class,
            StaffSeeder::class,
        ]);
    }
}
