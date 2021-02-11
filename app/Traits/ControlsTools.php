<?php

namespace App\Traits;

use App\Models\Tool;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsTools
{
    public function createTools(array $tools)
    {
        foreach ($tools as $tool) {
            Validator::make($tool, ['slug' => 'required|unique:tools'])->validate();

            $newItem = new Tool($tool);
            $newItem->title = json_encode($tool['title']);
            $newItem->save();
            $newItem->setFeature($tool['feature']);
        }
    }
}
