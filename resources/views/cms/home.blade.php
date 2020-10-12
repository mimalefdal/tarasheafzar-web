@extends('layouts.panel')
@push('styles')
    <link href="{{ asset('css/home.css') }}" rel="stylesheet" />
@endpush
@section('title')
    پنل مدیریت سایت شرکت تراشه‌افزار
@endsection

@section('panel-title')
    پنل مدیریت سایت شرکت تراشه‌افزار
@endsection

@section('content')
    <div class='responsive-inner-width'>
        <div id="cmsApp"></div>
        <script src="{{ asset('js/app.js') }}"></script>

    </div>

@endsection
