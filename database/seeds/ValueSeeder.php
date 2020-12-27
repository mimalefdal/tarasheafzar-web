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
        foreach($values as $value)
        {
            $newValue = new Value([
                "field"=>$field,
                "slug"=>$value['slug'],
                "title"=>$value['title'],
            ]);
            $newValue->save();
            }
        }
    }
}