<?php

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeaturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/basicFeatures.json';
        $items = file_get_contents($path);
        $items = json_decode($items, true);

        foreach ($items as $item) {
            $newItem = new Feature($item);
            $newItem->title = json_encode($item['title']);
            $newItem->save();
        }
    }
}