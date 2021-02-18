<?php

use App\Console\Commands\InitializeClear;
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
            JoblevelSeeder::class,
            PositionSeeder::class,
            StaffSeeder::class,
        ]);
    }
}
