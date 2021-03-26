<?php

use App\Models\Feature;
use App\Traits\ControlsFeatures;
use Illuminate\Database\Seeder;

class FeaturesSeeder extends Seeder
{
    use ControlsFeatures;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/system/Features.json';
        $items = file_get_contents($path);
        $items = json_decode($items, true);

        $this->createFeatures($items);
        // foreach ($items as $item) {
        //     $newItem = new Feature($item);
        //     $newItem->title = json_encode($item['title']);
        //     $newItem->save();
        // }
    }
}
