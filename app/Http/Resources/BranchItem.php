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
        $type = Value::where('field', 'branchtypes')->where('slug', $branch['type'])->first();

        $branch['type'] = \Lang::get('values.' . $type->title);
        $branch['type_en'] = $type->title;
        $branch['type_object'] = new DropdownItem($type);

        $titles = json_decode($branch['title']);
        $branch['title'] = $titles->$lang;
        $branch['title_en'] = $titles->en;
        if ($branch['deleted_at'] != null) {
            $branch['deleted'] = true;
        }
        return $branch;
    }
}
