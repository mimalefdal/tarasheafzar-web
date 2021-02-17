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
        $path = base_path() . '/public/data/basicBranchs.json';
        $basicBranchs = file_get_contents($path);
        $basicBranchs = json_decode($basicBranchs, true);
        foreach ($basicBranchs as $branch) {

            $newBranch = new Branch([
                "slug" => $branch['slug'],
                "type" => $branch['type'],
                "title" => json_encode($branch['title'])

            ]);
            $newBranch->save();
        }
    }
}
