<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffManageDisplayItem extends JsonResource
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

        $item['personnel_id'] = $this->personnel_id;
        $item['idcert_no'] = $this->idcert_no;
        $item['national_id'] = $this->national_id;
        $item['firstname'] = $this->firstname;
        $item['lastname'] = $this->lastname;
        $item['fullname'] = $this->getFullNameAttribute();
        $item['position'] = PositionSimpleItem::make($this->position);
        $item['joblevel_priority'] = $this->position->joblevel->priority;
        $item['suspended'] = $this->suspended;
        $item['deleted'] = $this->trashed();
        $item['holder'] = BlockItem::make($this->holder());
        $item['staffCrew'] = StaffSimpleItem::collection($this->staffCrew());
        $item['access_rights'] = RightDisplayItem::collection($this->allrights());
        $item['rights'] = RightDisplayItem::collection($this->rights);

        return $item;
    }
}
