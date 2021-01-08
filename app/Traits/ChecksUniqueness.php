<?php

namespace App\Traits;

trait ChecksUniqueness
{

    public function isNamedUnique()
    {
        $errors = collect();
        $globalNameCheck = $this->isGlobalNameUnique();
        $localNameCheck = $this->isLocalNameUnique();

        if ($globalNameCheck != null) $errors = $errors->merge($globalNameCheck);
        if ($localNameCheck != null) $errors = $errors->merge($localNameCheck);

        return $errors->toArray();
    }

    public function isLocalNameUnique()
    {
        $lang = \Lang::getLocale();

        $title = json_decode($this->title);
        $localTitle = $title->$lang;
        $localTitleCheck = get_class($this)::withTrashed()->where('title->' . $lang, $localTitle)->where('type', $this->type)->first();
        if ($localTitleCheck != null) {
            if ($localTitleCheck->id != $this->id) {
                $error = ['title_' . $lang => [__('validation.unique', ['attribute' => __('validation.attributes.title')]), "item" => $localTitleCheck]];
                return $error;
            }
        }
        return null;
    }

    public function isGlobalNameUnique()
    {
        $slugCheck = get_class($this)::withTrashed()->where('slug', $this->slug)->first();
        if ($slugCheck != null) {
            if ($slugCheck->id != $this->id) {
                $error = ['title_en' => [__('validation.unique', ['attribute' => __('validation.attributes.title')]), "item" => $slugCheck]];
                return $error;
            }
        }
        return null;
    }
}
