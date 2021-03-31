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

        // return parent::toArray($request);
        // $item = parent::toArray($request);

        $item = [];

        $item['id'] = $this->id;
        $item['slug'] = $this->slug;

        $type = Value::where('field', 'branchtypes')->where('slug', $this->type)->first();

        $item['type_slug'] = $this->type;
        $item['type_en'] = $type->title;
        $item['type'] = \Lang::get('values.' . $type->title);

        $item['full_title'] = $this->fullTitle();
        $item['full_title_en'] = $this->fullTitle('en');
        // $item['short_title'] = $this->typedTitle();
        // $item['short_title_en'] = $this->typedTitle('en');
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        $item['directcrew'] = StaffManageDisplayItem::collection($this->directcrew());
        $item['subsetCrew'] = StaffManageDisplayItem::collection($this->subsetCrew());

        if (isset($this->departments))
            $item['departments'] = BlockItem::collection($this->departments);
        if (isset($this->units))
            $item['units'] = BlockItem::collection($this->units);
        if (isset($this->positions))
            $item['positions'] =  PositionSimpleItem::collection($this->positions);

        $item['deleted'] = $this->trashed();
        if ($item['deleted'])
            $item['deleted_warning'] = Lang::get('messages.deleted_warning', ['blocktype' => Lang::get('values.Branch')]);


        return $item;
    }
}
