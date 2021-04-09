<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class RightDisplayItem extends JsonResource
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
        $item = [];

        $item['id'] = $this->id;
        $item['activation'] = $this->activation;
        $item['title'] = Bilang::getLocalTitle($this->title, true);
        $item['title_en'] = Bilang::getEnTitle($this->title);
        if (isset($this->childs))
            $item['childs'] = RightDisplayItem::collection($this->childs);
        return $item;
    }
}
