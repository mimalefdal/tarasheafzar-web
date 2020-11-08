<?php

use Illuminate\Database\Seeder;
use App\Models\Unit;
use App\Models\Role;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/public/data/basicUnits.json';
        $basicUnits = file_get_contents($path);
        $basicUnits = json_decode($basicUnits, true);
        foreach($basicUnits as $Unit) {
            $newUnit = new Unit([
                "slug"=>$Unit['slug'],
                "title"=>$Unit['title'],
                "title_fa"=>$Unit['title_fa'],
            ]);
            $newUnit->save();

            if ($Unit['roles'] != null) {
                $roles = Role::whereIn('slug',$Unit['roles'])->get();
                $newUnit->addRoles($roles);
            }


        }
    }
}