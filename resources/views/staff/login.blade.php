@extends('layouts.panel')

@section('title')
    تراشه افزار | ورود همکاران
@endsection

@push('styles')
    <link href="{{ asset('css/login.css') }}" rel="stylesheet" />
    <style>
        body {
            background-color: white;
        }

    </style>
@endpush

@push('scripts')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

@endpush

@section('content')

    <div id='main-container' class="full-height flex-center">

        <div class="side-container" id="right-container">
            <div class="sub-container" id="title-container">
                <a href="{{ env('APP_ENV') == 'local' ? 'http://localhost:8000' : 'https://tarasheafzar.ir' }}"
                    style="cursor: default;">
                    <img id="company-logo" class="logo-main" src="{{ asset('image/talogo-nocap.png') }}"
                        alt="company logo" />
                </a>
                <div id="company-name" class="large-title">
                    شرکت تراشه افزار سامانه ایرانیان
                </div>
                <div id='panel-name' class="">پنل ورود همکاران</div>

            </div>
            <div class="sub-container" style="flex-direction: row;">

            </div>
            <!-- <div class="sub-container" id="news">
                        گزارش مالی هیئت مدیره مربوط به عملکر سال ۱۳۹۸ منتشر شد
                    </div> -->
        </div>


        <div class="side-container" id="left-container">
            <div class="sub-container" id="title-container">


            </div>
            <div class="sub-container" id="form-container">
                <div class="login-info">
                    <div id="dear-colleague">
                        همکار گرامی
                    </div>
                    <div id="loader" class="loader hidden"></div>
                    <div id="staff-name" class="staff-name">
                        وقت بخیر
                    </div>

                </div>
                <form class="login-form" id="login-form">
                    @csrf

                    <div id="idBlock" class="input-block">
                        <label class="input-label" for="personnelId">{{ __('auth.enterpersonnelId') }}</label>
                        <input class="input-auth" id="personnelId" type="text" name="personnelId"
                            value="{{ old('personnelId') }}" autocomplete="off" autofocus />

                    </div>

                    <div id="passBlock" class="input-block hidden">

                        <label class="input-label" for="password">{{ __('auth.enterpassword') }}</label>
                        <input class="input-auth" id="password" type="password" name="password" autofocus />
                    </div>
                    <div id='auth-error' class="invisible error-block">
                        <p id='error-message' class="error-message"></p>
                    </div>
                    <a href="" class=invisible id="not-you">
                        شخص دیگری هستم
                    </a>
                    <div class="input-block button-box hidden" id="login-button-box">
                        <button id="loginBtn" type="submit" class="btn btn-login"
                            onclick="event.preventDefault(); identifyPesonnelId()">
                            {{ __('auth.loginbtn') }}
                        </button>
                    </div>
                    <div class="input-block button-box" id="continue-button-box">
                        <button id="continueBtn" type="submit" class="btn btn-login"
                            onclick="event.preventDefault(); identifyPesonnelId()">
                            {{ __('auth.continuebtn') }}
                        </button>
                    </div>

                </form>

            </div>

            <div class="sub-container" id="bottom-container">
                <div style="display: flex;flex-direction: column;">
                    <a href="{{ url('password.reset') }}">گذرواژه/کد پرسنلی را فراموش کرده‌ام</a>

                </div>
            </div>
        </div>
    </div>
@endsection

<script>
    var loginstate = 0;
    var translations = {
        wrongPersonnelId: "@lang('auth.wrongPersonnelId')",
        wrongPassword: "@lang('auth.wrongPassword')",
        serverError: "@lang('auth.serverError')",
        male: "@lang('auth.maletitle')",
        female: "@lang('auth.femaletitle')",
    };

    function identifyPesonnelId() {
        // console.log($('meta[name="csrf-token"]').attr('content'));
        $("#error-message").text('');
        $("#auth-error").addClass('invisible');
        $("#loader").removeClass('hidden');
        $("#staff-name").addClass('hidden');
        $("#dear-colleague").addClass('hidden');
        $(".input-label").removeClass('error-message');

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        $.ajax({
            url: "{{ route('staff.login.submit') }}",
            method: 'post',
            data: {
                state: loginstate,
                personnel_id: $("input[name='personnelId']").val(),
                password: $("input[name='password']").val()
            },
            success: function(response) {
                // console.log('sucessResponse->', response)
                $("#loader").addClass('hidden');
                $("#staff-name").removeClass('hidden');
                $("#dear-colleague").removeClass('hidden');


                if (loginstate == 0) {
                    loginstate = 1
                    $("#passBlock").removeClass('hidden');
                    $("#idBlock").addClass('hidden');
                    $("#login-button-box").removeClass('hidden');
                    $("#continue-button-box").addClass('hidden');

                    $("#auth-error").addClass('invisible');
                    $('#password').focus();

                    var firstname = response.firstname;
                    var lastname = response.lastname;
                    var gender = response.gender;
                    var title = ''
                    if (gender == 'male') {
                        title = translations.male;
                    } else if (gender == 'female') {
                        title = translations.female;
                    }

                    var fullname = title.concat(' ', firstname, ' ', lastname);
                    $('#staff-name').text(fullname);
                    $("#not-you").removeClass("invisible")
                } else {
                    // console.log(response)
                    if (response.mode == 'dubug') {
                        console.log(response.data)
                    } else {
                        $('#staff-name').text("در حال هدایت هستید ...");
                        window.location = response.redirect_to
                    }
                }
            },
            error: function(reject) {
                // console.log('errorResponse->', reject);
                // console.log(reject.responseJSON)

                $("#auth-error").removeClass('invisible');
                $("#loader").addClass('hidden');
                $("#staff-name").removeClass('hidden');
                $("#dear-colleague").removeClass('hidden');

                if (reject.status === 422) {
                    // console.log(reject.responseJSON)
                    var message = reject.responseJSON.message
                    $(".input-label").addClass('error-message');
                }

                if (reject.status === 404) {
                    // console.log(reject.status)
                    var message = reject.responseJSON.message
                    $("#error-message").text(message);
                    $("#password").val("");
                }
                if (reject.status === 500) {
                    // console.log(reject.responseJSON.status)
                    var message = reject.responseJSON.message
                    $("#error-message").text(translations.serverError);

                }
                if (reject.status === 401) {
                    // console.log(reject)
                    var message = reject.responseJSON.message
                    $("#error-message").text(message);
                }
            }
        });
    }

</script>
