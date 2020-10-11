<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>

    <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/inner.css') }}" rel="stylesheet" />
    @if(Config::get('app.locale') == 'fa')
        <link href="{{ asset('css/appfa.css') }}" rel="stylesheet" />
    @endif

    @stack('scripts')
    @stack('styles')
</head>

<body>
    <div class="flex-center position-ref ">
        <x-mobile-menu />
        <x-fixed-title-ribbon />


        @yield('pre-content')
        <div class="inner-content flex-center position-ref">
            @yield('content')
        </div>
    </div>
    <x-site-footer />
</body>

</html>
