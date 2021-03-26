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

            $newItem = new Operation(Arr::except($operation, ['requiredRights']));
            // $newItem = new Operation(Arr::only($operation, ['slug', 'title', 'activation', 'state']));

            $newItem->setTool($toolSlug)->save();

            if (isset($operation['requiredRights']))
                $newItem->setRequiredRights($operation['requiredRights']);

            $newItem->save();
        }
    }
}
