<?php

use Illuminate\Database\Seeder;
use App\Models\Right;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $path = Storage::disk('public')->path('basicRoles.json');
        $path = base_path().'/public/data/basicRoles.json';

        $basicRoles = file_get_contents($path);
        $basicRoles = json_decode($basicRoles, true);
        foreach($basicRoles as $role) {
            $newrole = new Role([
                "slug"=>$role['slug'],
                "title"=>$role['title'],
                "title_fa"=>$role['title_fa'],
                "activation"=>$role['activation'],
            ]);
            $newrole->save();
            if ($role['rights'] != null ){
                if ($role['rights'][0] == "allRights") {
                    $rights=Right::all()->pluck('slug')->all();
                    $newrole->giveRightsTo($rights);

                }
            }
        }
    }
}
