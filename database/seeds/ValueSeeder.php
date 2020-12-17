<?php

use Illuminate\Database\Seeder;
use App\Models\Value;

class ValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/public/data/basicValues.json';
        $basicValues = file_get_contents($path);
        $basicValues = json_decode($basicValues, true);
        foreach($basicValues as $field=>$values )
        {
        foreach($values as $Value)
        {
            $newValue = new Value([
                "field"=>$field,
                "slug"=>$Value['slug'],
                "title"=>$Value['title'],
            ]);
            $newValue->save();
            }
        }
    }
}
