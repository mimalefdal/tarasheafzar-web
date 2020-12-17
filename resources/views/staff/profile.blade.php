@extends('layouts.panel')

@section('title')
    پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('panel-title')
    پروفایل
@endsection

@section('content')
    <div class="page-content responsive-inner-width">

        <p>{{ Auth::user()->nickname }}</p>
        <p>سمت شغلی</p>
        {{ Auth::user()->position->title_fa }}
        <p>نقش‌ها</p>
        @foreach (Auth::user()->roles as $role)
            <p>{{ $role->title_fa }}</p>
            <p>واحد {{ $role->unit->title_fa }}</p>
            <p>دپارتمان {{ $role->unit->department->title_fa }}</p>
        @endforeach

        <p>حقوق دسترسی</p>
        @if (null != Auth::user()->allrights())
            @foreach (Auth::user()->allrights() as $right)
                <p>{{ $right->slug }}</p>
            @endforeach
        @endisset


</div>

@endsection
