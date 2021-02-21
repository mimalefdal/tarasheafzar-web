@extends('layouts.panel')

@section('title')
    پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('panel-title')
    پنل کارکنان شرکت تراشه‌افزار
@endsection

@inject('features', 'App\Models\Feature')
@inject('tools', 'App\Models\Tool')

@section('content')
    <div class="responseive-width-full">
        <div id="panels-app" data-env={{ env('APP_ENV') }} data-user="{{ Auth::user() }}"
            data-name="{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}"
            data-rights="{{ Auth::user()->allrights() }}" data-locale="{{ Config::get('app.locale') }}"
            data-features="{{ $features
    ::whereIn('state', ['installed', 'built-in'])->get()->toBase()->merge($tools::whereIn('state', ['installed', 'built-in'])->get()) }}">
        </div>

        <script src="{{ asset('js/app.js') }}"></script>
    </div>

@endsection
