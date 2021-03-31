<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CompanyGeneralInfo extends JsonResource
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

        $item['full_title'] = $this->fullTitle();
        $item['branches'] = BranchItem::collection($this->branches());
        $item['departments'] = DepartmentItem::collection($this->departments());
        $item['units'] = UnitItem::collection($this->units());
        $item['positions'] = PositionSimpleItem::collection($this->positions());

        $item['directcrew'] = StaffManageDisplayItem::collection($this->directcrew());
        $item['subsetCrew'] = StaffManageDisplayItem::collection($this->subsetCrew());
        // $item['sag'] = $this->subsetCrew();

        return $item;
    }
}
