<?php

use Illuminate\Database\Seeder;
use App\Models\Unit;
use App\Models\Department;

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
        foreach($basicUnits as $unit)
        {
            $newUnit = new Unit([
                "slug"=>$unit['slug'],
                "title"=>json_encode($unit['title']),
            ]);
            $newUnit->save();

            if ($unit['department'] != null) {
                $department = Department::where('slug',$unit['department'])->firstorfail();
                $newUnit->setDepartment($department)->save();
            }
        }
    }
}
