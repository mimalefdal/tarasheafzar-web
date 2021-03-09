<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class BlockItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);

        $req = parent::toArray($request);
        $item = [];
        $item['id'] = $this->id;
        $item['slug'] = $this->slug;

        if (method_exists($this, 'fullTitle')) {
            $item['full_title'] = $this->fullTitle();
            $item['full_title_en'] = $this->fullTitle('en');
        }
        if (method_exists($this, 'typedTitle')) {

            $item['short_title'] = $this->typedTitle();
            $item['short_title_en'] = $this->typedTitle('en');
        }
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        if (isset($this->class))
            $item['class'] = $this->class;

        if (isset($req['departments']))
            $item['departments'] = BlockItem::collection($this->departments);

        if (isset($req['units']))
            $item['units'] = BlockItem::collection($this->units);


        return $item;
    }
}
