<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionSimpleItem extends JsonResource
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

        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        $item['recruit_capacity'] = $this->recruit_capacity;

        $item['joblevel'] = $this->joblevel->slug;
        $item['joblevel_title'] = Bilang::getLocalTitle($this->joblevel->title);
        $item['joblevel_title_en'] = Bilang::getEnTitle($this->joblevel->title);

        $item['short_title'] = $this->levelTitle();
        $item['short_title_en'] = $this->levelTitle('en');

        $item['full_title'] = $this->fullTitle();
        $item['full_title_en'] = $this->fullTitle('en');

        $item['liststitle'] = $item['full_title'];


        return $item;
    }
}
