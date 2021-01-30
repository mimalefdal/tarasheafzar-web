<?php

use Illuminate\Database\Seeder;
use App\Models\Position;
use App\Models\Joblevel;
use App\Models\Company;
use App\Models\Branch;
use App\Models\Unit;
use App\Models\Department;


class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/basicPositions.json';
        $basicPositions = file_get_contents($path);
        $basicPositions = json_decode($basicPositions, true);
        foreach ($basicPositions as $position) {
            $newPosition = new Position([
                "slug" => $position['slug'],
                "title" => json_encode($position['title']),
                "display_title" => json_encode($position['display_title']),
                "recruit_capacity" => $position['recruit_capacity'],
            ]);
            $newPosition->save();
            if ($position['holderType'] != null) {
                switch ($position['holderType']) {
                    case 'branch':
                        $hasposition = Branch::where('slug', $position['holder'])->firstorfail();
                        break;

                    case 'department':
                        $hasposition = Department::where('slug', $position['holder'])->firstorfail();
                        break;

                    case 'unit':
                        $hasposition = Unit::where('slug', $position['holder'])->firstorfail();
                        break;

                    default:
                        // $hasposition = resolve('Company');
                        $hasposition = null;
                        break;
                }
                // dump(get_class($hasposition));
                $newPosition->setHasPosition($hasposition)->save();
            }

            if ($position['job-level'] != null) {
                $jobLevel = Joblevel::where('slug', $position['job-level'])->first();
                $jobLevel->positions()->save($newPosition);
            }

            if ($position['roles'] != null) {
                $newPosition->setRoles($position['roles']);
            }
        }
    }
}
