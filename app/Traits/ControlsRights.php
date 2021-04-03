<?php

namespace App\Traits;

use App\Models\Right;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsRights
{
    public function createRights(array $rights, $parentRight = null)
    {
        foreach ($rights as $right) {
            Validator::make($right, ['slug' => 'required|unique:rights'])->validate();

            $newItem = new Right(Arr::only($right, ['slug', 'title', 'activation']));
            // $newItem->title = json_encode($right['title']);
            if ($parentRight)
                $newItem->parent()->associate($parentRight);
            $newItem->save();

            // create deeper child rights
            if (isset($right['childrights']))
                $this->createRights($right['childrights'], $newItem);
        }
    }
}
