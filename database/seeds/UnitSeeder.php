<?php

use App\Models\Branch;
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
        $path = base_path() . '/public/data/trial/basicUnits.json';
        $basicUnits = file_get_contents($path);
        $basicUnits = json_decode($basicUnits, true);
        foreach ($basicUnits as $unit) {
            $newUnit = new Unit([
                "slug" => $unit['slug'],
                "title" => json_encode($unit['title']),
            ]);
            $newUnit->save();

            switch ($unit['holderType']) {
                case 'company':
                case null:
                    $hasunit = null;
                    break;

                case 'branch':
                    $hasunit = Branch::where('slug', $unit['holder'])->firstorfail();
                    break;

                case 'department':
                    $hasunit = Department::where('slug', $unit['holder'])->firstorfail();
                    break;

                default:
                    $hasunit = null;
                    break;
            }
            $newUnit->setHasUnit($hasunit)->save();
        }
    }
}
