<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title')</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/panel.css') }}" rel="stylesheet" />
    @if (Config::get('app.locale') == 'fa')
        <link href="{{ asset('css/appfa.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/panelfa.css') }}" rel="stylesheet" />
    @endif

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">



    @stack('scripts')
    @stack('styles')
</head>

<body>
    @auth

        <!-- sticky nav-bat code.txt GOES HERE-->
        <div class="nav-items-container .bg-light">
            <nav class="navbar navbar-expand-lg navbar-light responsive-inner-width">
                <!-- <a href="/home" class="navbar-item-text">خانه</a> -->
                @auth('staff')
                    <div class="staff-info">

                        @if (Auth::user()->position != null)
                            <a href="{{ route('staff.profile') }}" class="staff-name">{{ $user->firstname }}
                                {{ $user->lastname }} </a>
                            <p class="staff-job-title">{{ $user->title }} </p>
                        @else
                            <p class="staff-name">{{ $user->title }}</p>
                            <p class="staff-job-title">

                            </p>

                        @endif

                    </div>

                    <a href="{{ route('staff.logout') }}" class="btn btn-primary">خروج</a>
                @endauth
            </nav>

        </div>
    @endauth

    {{-- <div class="flex-center position-ref "> --}}
        <div class="position-ref ">
            <!--
            <div class="panel-title">
                <p class="panel-title-text">@yield('panel-title')</p>
            </div> -->

            @yield('pre-content')
            <div class="content">
                @yield('content')
            </div>

        </div>


</body>

</html>
