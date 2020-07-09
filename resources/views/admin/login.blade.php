@extends('layouts.panel')

@section('title')
پانل مدیران شرکت تراشه افزار
@endsection

@push('styles')
    <link href="{{ asset('css/login.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/loginAdmin.css') }}" rel="stylesheet" />
    <style>
        body {
            background-color: white;
        }

    </style>
@endpush

@push('scripts')
    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

@endpush

@section('content')

<div id='main-container' class="full-height flex-center">

    <!-- <div class="side-container" id="right-container">
        <div class="sub-container" id="title-container">
            <img id="company-logo" class="logo-main" src="{{ asset('image/talogo-nocap.png') }}"
                alt="company logo" />

            <div id="company-name" class="large-title">
                شرکت تراشه افزار سامانه ایرانیان
            </div>
            <div id='panel-name' class="">پنل ورود مدیران</div>

        </div>

    </div> -->


    <div class="shaddow-container" id="shaddow-container">
        <div class="sub-container" id="title-container">
            <a href="{{ route('staff.login') }}" style="cursor: default;">
                <img id="company-logo" class="logo-main" src="{{ asset('image/talogo-nocap.png') }}"
                    alt="company logo" />
            </a>
            <div id="company-name" class="large-title">
                شرکت تراشه افزار سامانه ایرانیان
            </div>
            <div id='panel-name' class="">پنل مدیریت سایت</div>

        </div>
        <div class="sub-container" id="form-container">

            <form class="login-form" id="login-form">
                @csrf

                <div id="idBlock" class="input-block">
                    <label class="input-label" for="username">{{ __('auth.username') }}</label>
                    <input class="input-auth" id="username" type="text" name="username"
                        value="{{ old('username') }}" autocomplete="off" autofocus>

                </div>

                <div id="passBlock" class="input-block">

                    <label class="input-label" for="password">{{ __('auth.password') }}</label>
                    <input class="input-auth" id="password" type="password" name="password" autofocus>
                </div>
                <div id='auth-error' class="invisible error-block">
                    <p id='error-message' class="error-message"></p>
                </div>

                <div class="input-block button-box" id="login-button-box">
                    <button id="loginBtn" type="submit" class="btn btn-login"
                        onclick="event.preventDefault(); tryLogin()">
                        {{ __('auth.loginbtn') }}
                    </button>
                </div>

            </form>

        </div>

        <div class="sub-container" id="bottom-container">
            <div>
                <a href="{{ url('password.reset') }}">گذرواژه را فراموش کرده‌ام</a>
            </div>
        </div>
    </div>
</div>
@endsection

<script>
    var translations = {
        invalidData: "@lang('auth.invalidData')",
        wrongPersonnelId: "@lang('auth.wrongPersonnelId')",
        wrongPassword: "@lang('auth.wrongPassword')",
        serverError: "@lang('auth.serverError')",
        male: "@lang('auth.maletitle')",
        female: "@lang('auth.femaletitle')",
    };

    function tryLogin() {
        console.log();
        $("#error-message").text('');
        $("#auth-error").addClass('invisible');
        $("#loader").removeClass('hidden');
        $("#staff-name").addClass('hidden');
        $("#dear-colleague").addClass('hidden');


        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });


        jQuery.ajax({
            url: "{{ route('admin.login') }}",
            method: 'post',
            data: {
                username: $("input[name='username']").val(),
                password: $("input[name='password']").val()
            },
            success: function (response) {
                console.log('sucessResponse->', response)
                $("#loader").addClass('hidden');
                $("#staff-name").removeClass('hidden');
                $("#dear-colleague").removeClass('hidden');

                if (response.redirect_to) {
                    window.location = response.redirect_to
                }
            },
            error: function (reject) {
                console.log('errorResponse->', reject.responseJSON.errors);

                $("#auth-error").removeClass('invisible');
                $("#loader").addClass('hidden');
                $("#staff-name").removeClass('hidden');
                $("#dear-colleague").removeClass('hidden');

                if (reject.status === 422) {
                    console.log(reject.status)
                    var errors = [];
                    $.each(reject.responseJSON.errors, function (error, message) {
                        console.log(error)
                        errors.push([message])
                    })

                    console.log(errors);

                    $("#error-message").text(errors[0]);

                } else {
                    $("#error-message").text(reject.responseJSON.message);
                }

                // if (reject.status === 404) {
                //     console.log(reject.status)
                //     var message = reject.responseJSON.message
                //     $("#error-message").text(reject.responseJSON.message);

                // }
                // if (reject.status === 500) {
                //     console.log(reject.responseJSON.status)
                //     var message = reject.responseJSON.message
                //     $("#error-message").text(translations.serverError);

                // }
                // if (reject.status === 401) {
                //     console.log(reject)
                //     var message = reject.responseJSON.message
                //     $("#error-message").text(translations.wrongPassword);
                // }



            }
        });
    }

</script>
