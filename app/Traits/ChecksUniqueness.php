<?php

namespace App\Traits;

use Illuminate\Validation\ValidationException;
use stdClass;

trait ChecksUniqueness
{
    public function validateUnity()
    {
        $isUnique = $this->isUnique();
        if (!$isUnique->check) {
            throw ValidationException::withMessages($isUnique->errors);
        }
    }

    public function isNamedUnique($combiner = null)
    {

        $lang = \Lang::getLocale();
        $globalNameCheck = null;
        $localNameCheck = null;

        $errors = collect();
        $globalNameCheck = $this->isGlobalNameUnique();
        if ($lang != 'en') $localNameCheck = $this->isLocalNameUnique($combiner, $multiple = is_array($combiner));

        if ($globalNameCheck != null) $errors = $errors->merge($globalNameCheck);
        if ($localNameCheck != null) $errors = $errors->merge($localNameCheck);

        return $errors->toArray();
    }

    public function isLocalNameUnique($combiner = null, $multiple = false)
    {
        $lang = \Lang::getLocale();

        $title = json_decode($this->title);
        $localTitle = $title->$lang;
        if ($combiner != null) {
            if ($multiple == false)
                $localTitleCheck = get_class($this)::withTrashed()->where('title->' . $lang, $localTitle)->where($combiner, $this[$combiner])->first();
            else
            // means combliner is an array
            {
                $query = get_class($this)::withTrashed()->where('title->' . $lang, $localTitle);
                foreach ($combiner as $key => $type) {
                    switch ($type) {
                        case 'column':
                            $query = $query->where($key, $this[$key]);
                            break;

                        case 'morph':
                            $query = $query->where($key . '_type', $this[$key . '_type'])->where($key . '_id', $this[$key . '_id']);
                            break;
                    }
                }
                $localTitleCheck = $query->first();
            }
        } else
            // means combliner is null
            $localTitleCheck = get_class($this)::withTrashed()->where('title->' . $lang, $localTitle)->first();


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

    public function isUnique()
    {
        return $this->unity();
    }

    private function unity($combinerObject = null,  $resourceClass = null)
    {
        $unity = new stdClass();
        $isNamedUnique = $this->isNamedUnique($combiner = $combinerObject);

        if ($isNamedUnique == null) {
            $unity->check = true;
        } else {
            $unity->check = false;
            // Transform matched item to api resource
            if ($resourceClass != null)
                foreach ($isNamedUnique as $key => &$error) {
                    $error['item'] = new $resourceClass($error['item']);
                }
            $unity->errors = $isNamedUnique;
        }
        return $unity;
    }
}
