<?php

use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\Department;

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
        foreach($basicDepartments as $department) {

            $newDepartment = new Department([
                "slug"=>$department['slug'],
                "title"=>json_encode($department['title']),

            ]);
            $newDepartment->save();

            if ($department['branch'] != null) {
                $branch = Branch::where('slug',$department['branch'])->first();
                $newDepartment->setBranch($branch)->save();
            }
        }

    }
}
