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
        $lang = \Lang::getLocale();

        return [
            'title_en' => 'required|string|min:3',
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

        $holder = null;
        $holderSlug = null;
        switch ($this->holderType) {
            case 'company':
                $holder = resolve('Company');
                break;
            case 'branch':
                $holder = Branch::where('slug', $this->holder)->first();
                break;
            case 'department':
                $holder = Department::where('slug', $this->holder)->first();
                break;
            default:
                break;
        }
        $holderSlug = $holder->slug;
        $slugTemplate = $holderSlug . ' ' . $this->title_en . ' unit';

        $this->merge([
            'slug' => Str::slug(Str::slug($slugTemplate, '-')),
            'title' => $titles,
            'holder' => $holder,
            'deleted_at' => null,
        ]);
    }
}
