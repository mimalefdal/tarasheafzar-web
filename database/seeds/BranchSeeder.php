<?php

use Illuminate\Database\Seeder;
use App\Models\Branch;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/trial/basicBranches.json';
        $basicBranches = file_get_contents($path);
        $basicBranches = json_decode($basicBranches, true);
        foreach ($basicBranches as $branch) {

            $newBranch = new Branch([
                "slug" => $branch['slug'],
                "type" => $branch['type'],
                "title" => json_encode($branch['title'])

            ]);
            $newBranch->save();
        }
    }
}
