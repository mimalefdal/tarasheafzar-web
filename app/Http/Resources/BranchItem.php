<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Value;
use Bilang;
use Illuminate\Support\Facades\Lang;

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

        // $item = parent::toArray($request);

        $item = [];

        $item['id'] = $this->id;

        $type = Value::where('field', 'branchtypes')->where('slug', $this->type)->first();

        $item['type_slug'] = $this->type;
        $item['type_en'] = $type->title;
        $item['type'] = \Lang::get('values.' . $type->title);

        $item['full_title'] = $this->fullTitle();
        $item['full_title_en'] = $this->fullTitle('en');
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        $item['deleted'] = $this->trashed();
        if ($item['deleted'])
            $item['deleted_warning'] = Lang::get('messages.deleted_warning', ['blocktype' => Lang::get('values.Branch')]);
        $item['slug'] = $this->slug;

        return $item;
    }
}
