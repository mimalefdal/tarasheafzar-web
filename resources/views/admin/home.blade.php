@extends('layouts.panel')
@push('styles')
    <link href="{{ asset('css/homeAdmin.css') }}" rel="stylesheet" />
@endpush
@section('title')
پنل مدیریت سایت شرکت تراشه‌افزار
@endsection



@section('content')
<div>
    @section('panel-title')
    پنل مدیریت سایت شرکت تراشه‌افزار
    @endsection

    <div class='wrap-box'>
        <div class="btn-func-item">
            @lang('items.manage-roles')
        </div>
    </div>




</div>

@endsection
