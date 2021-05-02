<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleDisplayItem extends JsonResource
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
        $item['activation'] = $this->activation;
        $item['title'] = Bilang::getLocalTitle($this->title, true);
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['rights'] = RightDisplayItem::collection($this->rights);
        // $item['holder_positions'] = $this->positions;
        // $item['holder_staff'] = $this->staff;
        $item['_holders'] = $this->holders();
        // $item['manager_positions'] = $this->managerPositions;
        // $item['manager_staff'] = $this->managerStaff;
        $item['_managers'] = $this->managers();
        // $item['owner_positions'] = $this->ownerPositions;
        // $item['owner_staff'] = $this->ownerStaff;
        $item['_owners'] = $this->owners();

        return $item;
    }
}
