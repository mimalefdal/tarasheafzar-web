<?php

use Illuminate\Database\Seeder;
use App\Models\Position;
use App\Models\Joblevel;


class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/public/data/basicPositions.json';
        $basicPositions = file_get_contents($path);
        $basicPositions = json_decode($basicPositions, true);
        foreach($basicPositions as $position)
        {
            $newPosition = new Position([
                "slug"=>$position['slug'],
                "title"=>$position['title'],
                "title_fa"=>$position['title_fa'],
                "recruit_capacity"=>$position['recruit_capacity'],
            ]);
            $newPosition->save();

            if ($position['job-level'] != null)
            {
                $jobLevel = Joblevel::where('slug',$position['job-level'])->first();
                $jobLevel->positions()->save($newPosition);
            }

            if ($position['roles'] != null)
            {
                $newPosition->setRoles($position['roles']);
            }


        }
    }
}
