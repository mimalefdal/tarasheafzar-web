<?php

use App\Traits\ControlsOperations;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{

    use ControlsOperations;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/basicOperations.json';
        $items = file_get_contents($path);
        $items = json_decode($items, true);

        // dump($items);

        foreach ($items as $operationSet) {
            $this->createOperations($operationSet['tool'], $operationSet['operations']);
        }
    }
}
