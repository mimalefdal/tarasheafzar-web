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
    <p>عنوان شغلی</p>

    @foreach( Auth::user()->roles as $role )
        <p>{{ $role->title_fa }}</p>
    @endforeach
    <p>حقوق دسترسی</p>

    @foreach(Auth::user()->allrights() as $right)
        <p>{{ $right->slug }}</p>
    @endforeach

</div>

@endsection
