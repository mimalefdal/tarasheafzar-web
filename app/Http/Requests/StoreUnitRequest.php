<?php

namespace App\Http\Requests;

use Bilang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Utility;

class StoreUnitRequest extends FormRequest
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

        $holder = Utility::getHolder($this->holderType, $this->holder);
        ($holder != null) ?
            $holderSlug = $holder->slug :
            $holderSlug = null;

        $slugTemplate = $holderSlug . ' ' . $this->title_en . ' unit';

        $this->merge([
            'slug' => Str::slug(Str::slug($slugTemplate, '-')),
            'title' => $titles,
            'holder' => $holder,
            'deleted_at' => null,
        ]);
    }
}
