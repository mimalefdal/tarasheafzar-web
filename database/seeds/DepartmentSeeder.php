<?php

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Unit;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/public/data/basicDepartments.json';
        $basicDepartments = file_get_contents($path);
        $basicDepartments = json_decode($basicDepartments, true);
        foreach($basicDepartments as $Department) {

            $newDepartment = new Department([
                "slug"=>$Department['slug'],
                "title"=>$Department['title'],
                "title_fa"=>$Department['title_fa'],

            ]);
            $newDepartment->save();
            if ($Department['units'] != null) {
                $units = Unit::whereIn('slug',$Department['units'])->get();
                $newDepartment->setUnits($units);
            }


        }

    }
}
