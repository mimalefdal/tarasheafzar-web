<?php

namespace App\Http\Resources;

use App\Models\Branch;
use App\Models\Department;
use App\Models\Value;
use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Lang;

class DepartmentItem extends JsonResource
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

        $item['holder_id'] = $this->branch_id;

        $type = 'Department';
        $item['type'] = \Lang::get('values.' . $type);
        $item['type_en'] = $type;

        $item['full_title'] = $this->fullTitle();
        $item['full_title_en'] = $this->fullTitle('en');
        $item['short_title'] = $this->typedTitle();
        $item['short_title_en'] = $this->typedTitle('en');
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);


        if (isset($this->units))
            $item['units'] = BlockItem::collection($this->units);
        if (isset($this->positions))
            $item['positions'] =  PositionSimpleItem::collection($this->positions);

        $item['directcrew'] = StaffManageDisplayItem::collection($this->directcrew());
        $item['subsetcrew'] = StaffManageDisplayItem::collection($this->subsetcrew());

        $item['deleted'] = $this->trashed();
        if ($item['deleted'])
            $item['deleted_warning'] = Lang::get('messages.deleted_warning', ['blocktype' => Lang::get('values.Department')]);

        //transform may-related branch info
        if ($this->branch_id != null) {
            $branch = Branch::withTrashed()->find($this->branch_id);
            $item['holder'] = BranchItem::make($branch);
            if ($branch->trashed())
                $item['deleted_holder_warning'] = Lang::get('messages.deleted_holder_warning', ['deleted' => $branch->fullTitle(), 'blocktype' => Lang::get('values.Department'), 'holdertype' => Lang::get('values.Branch')]);
        } else
            $item['holder'] = ['title' => resolve('Company')->shortTitle()];
        return $item;
    }
}
