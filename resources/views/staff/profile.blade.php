@extends('layouts.panel')

@section('title')
پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('panel-title')
پروفایل
@endsection

@section('content')


<div>
    <p>{{ Auth::user()->nickname }}</p>
</div>

@endsection
