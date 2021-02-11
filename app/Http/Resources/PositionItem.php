<?php

namespace App\Http\Resources;

use App\Models\Company;
use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;
use Lang;

class PositionItem extends JsonResource
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

        if ($this->display_title != null) {

            if (Bilang::getLocalTitle($this->display_title) <> "") {
                $item['display_title'] = Bilang::getLocalTitle($this->display_title);
                $item['display_fulltitle'] = $this->displayTitle();
            }
            if (Bilang::getLocalTitle($this->display_title, false, 'en') <> "") {
                $item['display_title_en'] = Bilang::getLocalTitle($this->display_title, false, 'en');
                $item['display_fulltitle_en'] = $this->displayTitle('en');
            }
        }

        $item['deleted'] = $this->trashed();
        $item['slug'] = $this->slug;

        //transform may-related hasposition info
        switch ($this->hasposition_type) {
            case null:
            case 'App\Models\Company':
                $item['holder'] = ['title' => resolve('Company')->getShortName()];
                $item['holder_type'] = 'company';
                // $item['holder_title'] = $item['holder']['title'][Lang::getLocale()];
                break;

            case 'App\Models\Branch':
                $item['holder'] = BranchItem::make($this->hasposition);
                $item['holder_type'] = 'branch';
                break;

            case 'App\Models\Department':
                $item['holder'] = DepartmentItem::make($this->hasposition);
                $item['holder_type'] = 'department';
                break;
            case 'App\Models\Unit':
                $item['holder'] = UnitItem::make($this->hasposition);
                $item['holder_type'] = 'unit';
                break;

            default:
                $item['holder'] = $this->hasposition;
                $item['holder_type'] = $this->hasposition_type;
                break;
        }
        // if ($this->hasposition_id != null)
        $item['holder_id'] = $this->hasposition_id;

        // if (Arr::has($item['holder'], 'deleted'))
        if (isset($item['holder']->deleted))
            if ($item['holder']['deleted']) {
                $item['deleted_holder_warning'] = Lang::get('messages.deleted_holder_warning', ['blocktype' => Lang::get('values.Department'), 'holdertype' => Lang::get('values.' . $item['holder_type'])]);
            }
        return $item;
    }
}
