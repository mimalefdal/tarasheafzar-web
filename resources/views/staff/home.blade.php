@extends('layouts.panel')

@section('title')
پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('content')
<div>
    @section('panel-title')
    پنل کارکنان شرکت تراشه‌افزار
    @endsection

    <div>
        @can('add-staff')
            <p>افزودن پرسنل جدید</p>
        @endcan

        @role('enterprise-admin')
            <p>مدیریت پرسنل</p>
        @endrole
    </div>
    <!-- @foreach(Auth::user()->allrights() as $right)
        <p>{{ $right->slug }}</p>
@endforeach
@foreach( Auth::user()->roles as $role )
        <p>{{ $role->slug }}</p>
@endforeach-->




</div>

@endsection
