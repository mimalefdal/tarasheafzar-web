<?php

namespace App\Traits;

use App\Models\Joblevel;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ControlsJoblevel
{

    public function createJoblevels(array $joblevels)
    {
        foreach ($joblevels as $joblevel) {
            Validator::make($joblevel, [
                'slug' => 'required|unique:joblevels'
            ])->validate();

            $newjoblevel = new Joblevel(Arr::only($joblevel, ['slug', 'scope', 'title', 'priority']));
            $newjoblevel->save();
        }
    }
}
