<?php

namespace App\Http\Requests;

use App\Models\Branch;
use Bilang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreDepartmentRequest extends FormRequest
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

        $branchSlug = null;
        $branchId = null;
        if ($this->branch) {
            $branch = Branch::where('slug', $this->branch)->first();
            $branchSlug = $branch->slug;
            $branchId = $branch->id;
        }
        $slugTemplate = $branchSlug . ' ' . $this->title_en . ' dep';

        $this->merge([
            'slug' => Str::slug(Str::slug($slugTemplate, '-')),
            'title' => $titles,
            'branch_id' => $branchId,
            'deleted_at' => null,
        ]);
    }
}
