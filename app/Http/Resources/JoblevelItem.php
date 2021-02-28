<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class JoblevelItem extends JsonResource
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
        $item['slug'] = $this->slug;
        $item['priority'] = $this->priority;
        $item['scope'] = $this->scope;
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);
        $item['deleted'] = $this->trashed();

        return $item;
    }
}
