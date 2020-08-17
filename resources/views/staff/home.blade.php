@extends('layouts.panel')

@section('title')
پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('panel-title')
پنل کارکنان شرکت تراشه‌افزار
@endsection

@section('content')
<div class="page-content responsive-inner-width">
    <div id="panels-app" data-user="{{ Auth::user() }}"
        data-name="{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}"
        data-rights="{{ Auth::user()->allrights() }}"
        data-locale="{{ Config::get('app.locale') }}">
    </div>
    <script>
        let nickname = "{{ Auth::user()->nickname }}"
        let rightset = "{{ Auth::user()->allrights() }}"

    </script>
    <script src="{{ asset('js/app.js') }}"></script>

    <!-- <div>
@can('add-staff')
            <p>افزودن پرسنل جدید</p>
@endcan

@role('enterprise-admin')
            <p>مدیریت پرسنل</p>
@endrole

@roles(['crm-agent','staff-manager'])
            <p>مدیریت کارکنان</p>
@endroles
    </div> -->


</div>

@endsection
