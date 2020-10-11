<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title')</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
    @if(Config::get('app.locale') == 'fa')
        <link href="{{ asset('css/appfa.css') }}" rel="stylesheet" />
    @endif

    @stack('scripts')
    @stack('styles')
</head>

<body>
    <div class="flex-center position-ref">
        <x-mobile-menu />
        @yield('pre-content')
        <div class="content">
            @yield('content')
        </div>

    </div>
    <x-site-footer />


</body>

</html>
