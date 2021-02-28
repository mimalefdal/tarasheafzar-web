<?php

namespace App\Http\Requests;

use Bilang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreJoblevelRequest extends FormRequest
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
            'scope' => 'nullable|string',
            'priority' => 'required|numeric|min:1',
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

        $slugTemplate = $this->title_en;
        $this->merge([
            'slug' => Str::slug(Str::slug($slugTemplate, '-')),
            'title' => $titles,
        ]);
    }
}
