<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Value;
use Bilang;

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

        // $branch = parent::toArray($request);

        $branch = [];

        $branch['id'] = $this->id;

        $type = Value::where('field', 'branchtypes')->where('slug', $this->type)->first();

        $branch['type_slug'] = $this->type;
        $branch['type_en'] = $type->title;
        $branch['type'] = \Lang::get('values.' . $type->title);

        $branch['full_title'] = $this->fullTitle();
        $branch['full_title_en'] = $this->fullTitle('en');
        $branch['title_en'] = Bilang::getEnTitle($this->title);
        $branch['title'] = Bilang::getLocalTitle($this->title, true);

        $branch['deleted'] = $this->trashed();
        $branch['slug'] = $this->slug;

        return $branch;
    }
}
