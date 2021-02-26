<?php

namespace App\Traits;

use App\Models\Feature;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsFeatures
{
    public function createFeatures(array $features)
    {
        foreach ($features as $feature) {
            Validator::make($feature, ['slug' => 'required|unique:features'])->validate();

            $newItem = new Feature($feature);
            if (!isset($newItem->state))
                $newItem->state = 'installed';
            $newItem->save();
        }
    }
}
