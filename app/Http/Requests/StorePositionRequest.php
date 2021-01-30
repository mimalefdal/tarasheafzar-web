<?php

namespace App\Http\Requests;

use App\Models\Joblevel;
use Bilang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Utility;

class StorePositionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $lang = \Lang::getLocale();

        return [
            'title_en' => 'required|string|min:2',
            'title_' . $lang => 'required|string|min:3',
            'holderType' => 'required',
            'joblevel' => 'required',
            'recruit_capacity' => 'required|numeric|min:1',
            // 'slug' => 'unique:positions'
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $titles = Bilang::makeTitleObject($this->title);
        $displayTitles = Bilang::makeTitleObject($this->displayTitle);

        $holder = Utility::getHolder($this->holderType, $this->holder);
        ($holder != null) ?
            $holderSlug = $holder->slug :
            $holderSlug = null;

        $joblevel = Joblevel::where('slug', $this->joblevel)->first();

        $slugTemplate = $holderSlug . ' ' . $this->title_en . ' ' . $this->joblevel;


        $this->merge([
            'slug' => Str::slug(Str::slug($slugTemplate, '-')),
            'title' => $titles,
            'display_title' => $displayTitles,
            'joblevel_id' => $joblevel->id,
            'holder' => $holder,
            'deleted_at' => null,
        ]);
    }
}
