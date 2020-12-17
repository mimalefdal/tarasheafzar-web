<?php

use Illuminate\Database\Seeder;
use App\Models\Joblevel;

class JobLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/public/data/basicJobLevels.json';
        $basicJobLevels = file_get_contents($path);
        $basicJobLevels = json_decode($basicJobLevels, true);
        foreach($basicJobLevels as $JobLevel)
        {
            $newJobLevel = new Joblevel([
                "slug"=>$JobLevel['slug'],
                "title"=>$JobLevel['title'],
                "title_fa"=>$JobLevel['title_fa'],
                "scope"=>$JobLevel['scope'],
                "priority"=>$JobLevel['priority'],
            ]);
            $newJobLevel->save();
        }
    }
}
