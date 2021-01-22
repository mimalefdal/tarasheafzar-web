<?php

namespace App\Http\Requests;

use App\Models\Branch;
use App\Models\Department;
use Bilang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

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
        return [
            //
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
    }
}
