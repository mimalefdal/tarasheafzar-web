@extends('layouts.panel')

@section('title')
    پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('panel-title')
    پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('content')
    <div class="page-content responseive-width-full">
        <div id="panels-app" data-env={{ env('APP_ENV') }} data-user="{{ Auth::user() }}"
            data-name="{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}"
            data-rights="{{ Auth::user()->allrights() }}" data-locale="{{ Config::get('app.locale') }}">
        </div>

        <script src="{{ asset('js/app.js') }}"></script>
    </div>

@endsection
