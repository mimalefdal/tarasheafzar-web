<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Position;
use App\Traits\ChecksUniqueness;
use Bilang;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Lang;

class Joblevel extends Model
{
    use ChecksUniqueness;
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'scope', 'priority'
    ];

    protected $casts = [
        'title' => 'array',
    ];
    protected $type = 'Joblevel';

    public function positions()
    {
        return $this->hasMany(Position::class);
    }

    public function typedTitle(string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        return Bilang::grammertize(Value::getLocalValue($this->type, $lang), Bilang::getLocalTitle($this->title, false, $lang), $lang);
    }
}
