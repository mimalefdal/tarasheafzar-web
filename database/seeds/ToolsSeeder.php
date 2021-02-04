<?php

use App\Models\Tool;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ToolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/basicTools.json';
        $items = file_get_contents($path);
        $items = json_decode($items, true);

        foreach ($items as $item) {
            $newItem = new Tool(Arr::except($item, ['feature']));
            $newItem->title = json_encode($item['title']);
            $newItem->save();
            dump($item['feature']);
            $newItem->setFeature($item['feature']);
        }
    }
}
