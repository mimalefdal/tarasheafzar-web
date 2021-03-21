<?php

namespace App\Traits;

use App\Models\Operation;
use App\Models\Tool;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsOperations
{
    public function createOperations(string $toolSlug, array $operations)
    {
        foreach ($operations as $operation) {
            Validator::make($operation, ['slug' => 'required|unique:operations'])->validate();

            $newItem = new Operation($operation);
            // $newItem = new Operation(Arr::only($operation, ['slug', 'title', 'activation', 'state']));
            dump($toolSlug);

            $newItem->setTool($toolSlug);
            $newItem->save();
        }
    }
}
