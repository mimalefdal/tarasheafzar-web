<?php

use Illuminate\Database\Seeder;
use App\Models\Right;
use App\Models\Role;
use App\Traits\ControlsRoles;

class RolesSeeder extends Seeder
{

    use ControlsRoles;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $path = Storage::disk('public')->path('basicRoles.json');
        $path = base_path() . '/public/data/basicRoles.json';

        $basicRoles = file_get_contents($path);
        $basicRoles = json_decode($basicRoles, true);

        $this->createRoles($basicRoles);
        // foreach ($basicRoles as $role) {
        //     $newrole = new Role([
        //         "slug" => $role['slug'],
        //         "title" => json_encode($role['title']),
        //         "activation" => $role['activation'],
        //     ]);
        //     $newrole->save();

        //     if ($role['rights'] != null) {
        //         if ($role['rights'][0] == "allRights") {
        //             $rights = Right::all()->pluck('slug')->all();
        //         } else {
        //             $rights = $role['rights'];
        //         }
        //         $newrole->giveRightsTo($rights);
        //     }
        // }
    }
}
