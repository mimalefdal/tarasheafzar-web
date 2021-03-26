<?php

namespace App\Traits;

use App\Models\Feature;
use Illuminate\Support\Arr;
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

            $newItem = new Feature(Arr::except($feature, ['requiredRights']));
            if (!isset($newItem->state))
                $newItem->state = 'installed';
            $newItem->save();

            if (isset($feature['requiredRights']))
                $newItem->setRequiredRights($feature['requiredRights']);

            $newItem->save();
        }
    }
}
