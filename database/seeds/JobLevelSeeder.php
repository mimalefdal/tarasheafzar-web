<?php

use Illuminate\Database\Seeder;
use App\Models\Joblevel;

class joblevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/basicJoblevels.json';
        $basicjoblevels = file_get_contents($path);
        $basicjoblevels = json_decode($basicjoblevels, true);
        foreach ($basicjoblevels as $joblevel) {
            $newjoblevel = new Joblevel([
                "slug" => $joblevel['slug'],
                "title" => json_encode($joblevel['title']),
                "scope" => $joblevel['scope'],
                "priority" => $joblevel['priority'],
            ]);
            $newjoblevel->save();
        }
    }
}
