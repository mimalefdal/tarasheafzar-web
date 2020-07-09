@extends('layouts.panel')

@section('title')
تراشه افزار | مدیریت سایت
@endsection

@push('styles')
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet" />
@endpush

@section('content')
<div id='main-container' class="full-height flex-center">


    <div class="sub-container" id="title-container">
        <img id="company-logo" class="logo-main" src="{{ asset('image/talogo-nocap.png') }}"
            alt="company logo" />
        <div class="">پنل مدیریت سایت</div>

        <div id="company-name" class="large-title">
            شرکت تراشه افزار سامانه ایرانیان
        </div>
    </div>
    <div class="sub-container" id="form-container">
        <form class="login-form" id="login-form">
            @csrf

            <div class="input-block">
                <label class="input-label" for="personnelId">{{ __('auth.username') }}</label>
                <input class="input-auth" id="personnelId" type="text" name="personnelId"
                    value="{{ old('personnelId') }}" autocomplete="off" autofocus>

            </div>

            <div class="input-block">
                <label class="input-label" for="password">{{ __('auth.password') }}</label>
                <input class="input-auth" id="password" type="password" name="password" autofocus>

            </div>
            <div class="input-block" id="login-button-box">
                <button type="submit" class="btn btn-login" onclick="event.preventDefault(); identifyPesonnelId()">
                    {{ __('auth.loginbtn') }}
                </button>
            </div>
        </form>

    </div>

    <div class="sub-container" id="bottom-container">
        <div>
            <a href="">گذرواژه/کد پرسنلی را فراموش کرده‌ام</a>
        </div>
    </div>

</div>
@endsection

<script>
    function identifyPesonnelId() {
        console.log('triggered');
        // console.log(event);
    }

</script>
