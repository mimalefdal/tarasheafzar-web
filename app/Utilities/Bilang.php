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

    public static function getLocalTitle($titleSet, bool $returnNull = false, string $lang = null)
    {
        if (!$lang) $lang = Lang::getLocale();

        if (is_string($titleSet)) {
            $titles = json_decode($titleSet);
            if (isset($titles->$lang))
                return $titles->$lang;
            else {
                if ($returnNull)
                    return '';
                else
                    return Lang::get('terms.no-title');
            }
        } else if (is_array($titleSet)) {
            $titles = $titleSet;
            if (isset($titles[$lang]))
                return $titles[$lang];
            else {
                if ($returnNull)
                    return '';
                else
                    return Lang::get('terms.no-title');
            }
        }
    }

    public static function getEnTitle($titleSet)
    {
        if (is_string($titleSet)) {
            $titles = json_decode($titleSet);
            return $titles->en;
        } elseif (is_array($titleSet)) {
            return $titleSet['en'];
        }
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
