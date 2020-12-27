<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Value;

class BranchItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $lang = \Lang::getLocale();

        $branch = parent::toArray($request);
        $type = Value::where('slug',$this->type)->first();
        $branch['type'] = \Lang::get('values.'.$type->title);

        $titles = json_decode($branch['title']);
        $branch['title'] = $titles->$lang;

        return $branch;
    }
}
