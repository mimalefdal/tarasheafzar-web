<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStaffRequest extends FormRequest
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
        $id = null;
        if (isset($this->item))
            $id = $this->item['id'];

        return [

            'gender' => "required",
            'firstname' => "required",
            'lastname' => "required",
            'national_id' => "required|numeric|digits:10|unique:staff,national_id," . $id,
            'idcert_no' => "required|numeric|unique:staff,idcert_no," . $id,
            'position' => "required",
            'username' => "required|string|alpha_dash|unique:staff,username," . $id,
            'email' => "nullable|email|unique:staff,email," . $id,

        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        if (isset($this->item)) {
            $this->merge(
                [
                    "personnel_id" => $this->idcert_no,
                ]
            );
        } else
            $this->merge(
                [
                    "personnel_id" => $this->idcert_no,
                    "password" => \Hash::make('changeme'),
                    // "username" => '',
                ]
            );
    }
}
