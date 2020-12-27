<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreBranchRequest extends FormRequest
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

        // echo ($this->data);
        $lang = \Lang::getLocale();

        return [
            'type' => 'required',
            'title_en' => 'required|string|min:3',
            'title_' . $lang => 'required',
            // 'slug'=>'unique:branches'
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug(Str::slug($this->title_en . ' ' . $this->type, '-')),
        ]);
    }
}
