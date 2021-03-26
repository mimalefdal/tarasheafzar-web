<?php

use App\Traits\ControlsRights;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;


class RightsSeeder extends Seeder
{
    use ControlsRights;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $path = Storage::disk('public')->path('basicRights.json');
        $path = base_path() . '/public/data/system/Rights.json';
        $basicRights = file_get_contents($path);
        $basicRights = json_decode($basicRights, true);

        $this->createRights($basicRights);

        // foreach ($basicRights as $right) {
        //     DB::table('rights')->insert([
        //         "slug" => $right['slug'],
        //         "title" => json_encode($right['title']),
        //         "activation" => $right['activation'],
        //     ]);
        // }
    }
}
