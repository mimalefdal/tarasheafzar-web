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
        // return parent::toArray($this);
        // return $this->resource;
        // return method_exists($this->resource, 'typedTitle');

        $req = parent::toArray($request);
        $item = [];
        $item['id'] = $this->id;
        $item['slug'] = $this->slug;

        if (method_exists($this->resource, 'fullTitle')) {
            $item['full_title'] = $this->fullTitle();
            $item['full_title_en'] = $this->fullTitle('en');
        }

        if (method_exists($this->resource, 'typedTitle')) {
            $item['short_title'] = $this->typedTitle();
            $item['short_title_en'] = $this->typedTitle('en');
        } else if (method_exists($this->resource, 'shortTitle')) {
            $item['short_title'] = $this->shortTitle();
            $item['short_title_en'] = $this->shortTitle('en');
        }

        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        if (isset($this->class))
            $item['class'] = $this->class;
        else
            $item['class'] = get_class($this->resource);

        if (isset($req['departments']))
            $item['departments'] = BlockItem::collection($this->departments);

        if (isset($req['units']))
            $item['units'] = BlockItem::collection($this->units);


        return $item;
    }
}
