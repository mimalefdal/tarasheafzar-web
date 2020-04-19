<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>

    <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/inner.css') }}" rel="stylesheet" />
    @stack('scripts')
    @stack('styles')
</head>

<body>
    <div class="flex-center position-ref ">
        <x-site-menu />
        <x-fixed-title-ribbon />


        @yield('pre-content')
        <div class="content">
            @yield('content')
        </div>
    </div>
    <x-site-footer />
</body>

</html>
