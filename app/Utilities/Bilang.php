<?php

class Bilang
{

    public static function ifLocal($local, $en)
    {
        $lang = Lang::getLocale();
        if ($lang == 'en')
            return $en;
        else
            return $local;
    }

    public static function grammertize(string $type, string $noun, string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();
        switch (self::langDirection($lang)) {
            case 'rtl':
                return $type . ' ' . $noun;
                break;

            default:
                return $noun . ' ' . $type;

                break;
        }
    }

    public static function getLocalTitle(string $titleSet, string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        $titles = json_decode($titleSet);

        if (Arr::has($titles, $lang))
            return $titles->$lang;
        else
            return Lang::get('terms.no-title');
    }

    public static function getEnTitle(string $titleSet)
    {
        Debugbar::info($titleSet);
        $titles = json_decode($titleSet);
        return $titles->en;
    }

    public static function makeTitleObject(string $titles, string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        $titles = json_decode($titles);
        return self::ifLocal(
            json_encode(['en' => $titles->en, $lang => $titles->local]),
            json_encode(['en' => $titles->en])
        );
    }

    public static function isUnique($item, string $combinerField = null, $resourceClass = null)
    {
        $isUnique = new stdClass();
        $isNamedUnique = $item->isNamedUnique($nameChecksWith = $combinerField);


        if ($isNamedUnique == null) {
            $isUnique->check = true;
        } else {
            $isUnique->check = false;
            // Transform matched item to api resource
            if ($resourceClass != null)
                foreach ($isNamedUnique as $key => &$error) {
                    $error['item'] = new $resourceClass($error['item']);
                }
            $isUnique->errors = $isNamedUnique;
        }

        return $isUnique;
    }



    private static function langDirection(string $lang)
    {
        switch ($lang) {
            case 'fa':
            case 'ar':
                return 'rtl';
                break;

            default:
                return 'ltr';
                break;
        }
    }
}
