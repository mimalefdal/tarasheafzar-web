<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title')</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/panel.css') }}" rel="stylesheet" />
    @if(Config::get('app.locale') == 'fa')
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

        <div class="nav-items-container .bg-light">
            <nav class="navbar navbar-expand-lg navbar-light responsive-inner-width">
                <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
                <!-- @if(Route::current()->getName() != 'staff.home')
                    <a href="/home" class="navbar-item-text">خانه</a>
@endif-->
                <a href="/home" class="navbar-item-text">خانه</a>


@auth('staff')
                    <div class="staff-info">
                        <a href="{{ route('staff.profile') }}"
                            class="staff-name">{{ Auth::user()->firstname }} {{ Auth::user()->lastname }} </a>
                        <p class="staff-job-title">{{ Auth::user()->roles->first()->title }} </p>
                    </div>

                    <a href="{{ route('staff.logout') }}" class="btn btn-primary">خروج</a>
@endauth
@auth('admin')
                    <div class="staff-info">
                        <a disabeld href="#" class="staff-name">{{ Auth::user()->name }}
                        </a>
                        <p class="staff-job-title">{{ Auth::user()->email }} </p>
                    </div>

                    <a id='btn-logout' href="{{ route('admin.logout') }}"
                        class="btn btn-primary">خروج</a>
@endauth
            </nav>

        </div>

@endauth

    <div class="flex-center position-ref ">
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
