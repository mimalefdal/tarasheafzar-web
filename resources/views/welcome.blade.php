<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>تراشه افزار سامانه ایرانیان</title>

        <!-- Fonts -->
        <!-- <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,600"
            rel="stylesheet"
        /> -->

        <!-- Styles -->
        <link href="{{ asset('css/base.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/welcome.css') }}" rel="stylesheet" />
        <link
            href="{{ asset('css/welcome-smalldisplay.css') }}"
            rel="stylesheet"
        />
        <link href="{{ asset('css/welcome-tablet.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/welcome-mobile.css') }}" rel="stylesheet" />

        <script>
            window.onscroll = function() {
                scrollFunction();
            };

            function scrollFunction() {
                var titleSection = document.getElementById("title-section");
                var titleRibbon = document.getElementById("title-ribbon");
                var companyName = document.getElementById("company-name");
                var welcomeTitle = document.getElementById("welcome-title");
                // var companyLogo = document.getElementById("company-logo");

                var scrollTreshold = 200;
                if (
                    document.body.scrollTop > scrollTreshold ||
                    document.documentElement.scrollTop > scrollTreshold
                ) {
                    welcomeTitle.style.display = "none";
                    titleSection.classList.add("stucked");
                    titleRibbon.classList.add("stucked");
                    companyName.classList.add("stucked");
                } else {
                    welcomeTitle.style.display = "block";
                    titleSection.classList.remove("stucked");
                    titleRibbon.classList.remove("stucked");
                    companyName.classList.remove("stucked");
                }
            }
        </script>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
            <div class="top-right links">
                @auth
                <a href="{{ url('/home') }}">Home</a>
                @else
                <a href="{{ route('login') }}">Login</a>

                @if (Route::has('register'))
                <a href="{{ route('register') }}">Register</a>
                @endif @endauth
            </div>
            @endif

            <div class="content">
                <img
                    id="company-logo"
                    class="logo-main"
                    src="{{ asset('image/talogo-nocap.png') }}"
                    alt="company logo"
                />
                <div id="title-section" class="sticky-top title-section">
                    <div id="welcome-title" class="pre-title">
                        خوش آمدید به وبسایت رسمی شرکت
                    </div>
                    <div id="title-ribbon" class="title-ribbon">
                        <!-- <img
                            src="{{ asset('image/menudot.svg') }}"
                            alt="menu-expander"
                        /> -->
                        <svg
                            id="menu-expander"
                            class="expander"
                            enable-background="new 0 0 515.555 515.555"
                            viewBox="0 0 515.555 515.555"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                            />
                            <path
                                d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                            />
                            <path
                                d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"
                            />
                        </svg>

                        <div id="company-name" class="large-title">
                            تراشه افزار سامانه ایرانیان
                        </div>
                        <!-- <img
                            src="{{ asset('image/phone.svg') }}"
                            alt="menu-expander"
                        /> -->

                        <svg
                            version="1.1"
                            id="contact-btn"
                            class="expander"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 405.333 405.333"
                            style="enable-background:new 0 0 405.333 405.333;"
                            xml:space="preserve"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M373.333,266.88c-25.003,0-49.493-3.904-72.704-11.563c-11.328-3.904-24.192-0.896-31.637,6.699l-46.016,34.752
			c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512,11.563-20.971,7.915-32.64
			C142.592,81.472,138.667,56.96,138.667,32c0-17.643-14.357-32-32-32H32C14.357,0,0,14.357,0,32
			c0,205.845,167.488,373.333,373.333,373.333c17.643,0,32-14.357,32-32V298.88C405.333,281.237,390.976,266.88,373.333,266.88z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title">برندها</div>
                    <div class="section-items section-items">
                        <div class="section-item">
                            <a
                                href="https:\\ramadelpc.com"
                                target="_blank"
                                class="section-item-title"
                                >رامادل</a
                            >
                            <div class="section-item-comment">
                                رایانه‌های تخصصی
                            </div>
                        </div>

                        <div class="section-item center">
                            <a class="section-item-title">دوارک</a>
                            <div class="section-item-comment">
                                معماری و توسعه نرم افزار
                            </div>
                        </div>

                        <div class="section-item">
                            <a class="section-item-title">راشبان</a>
                            <div class="section-item-comment">
                                خدمات مدیریت‌شده IT
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="section">
                    <div class="section-title">پلتفرم‌ها</div>
                    <div class="section-items"></div>
                </div> -->

                <div class="section">
                    <div class="section-title">استارتاپ‌ها</div>
                    <div class="section-items">
                        <div class="section-item">
                            <a class="section-item-title">گردان</a>
                            <div class="section-item-comment">
                                شبکه اجتماعی گشت و گذار
                            </div>
                        </div>

                        <div class="section-item">
                            <a class="section-item-title">توران</a>
                            <div class="section-item-comment">
                                سامانه تورهای گردشگری
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <!-- <div>سایت ما در حال به روز رسانی هست</div> -->
                        با ما تماس بگیرید
                    </div>
                    <div class="section-items contact-items">
                        <div class="contact-item">
                            <div class="contact-info">
                                <!-- <img
                                    id="contact-icon"
                                    class="expander"
                                    src="{{ asset('image/phone.svg') }}"
                                    alt="menu-expander"
                                /> -->
                                <div class="contact-title">تلفن</div>
                                <div class="contact-info">02188520322</div>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-info">
                                <!-- <img
                                    id="contact-icon"
                                    class="expander"
                                    src="{{ asset('image/phone.svg') }}"
                                    alt="menu-expander"
                                /> -->
                                <div class="contact-title">ایمیل</div>

                                <div class="contact-info">
                                    info@tarasheafzar.ir
                                </div>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-info">
                                <!-- <img
                                    id="contact-icon"
                                    class="expander"
                                    src="{{ asset('image/phone.svg') }}"
                                    alt="menu-expander"
                                /> -->
                                <div class="contact-title">اینستاگرام</div>

                                <div class="contact-info">
                                    info@tarasheafzar.ir
                                </div>
                            </div>
                        </div>

                        <div class="contact-item">
                            <div class="contact-info">
                                <!-- <img
                                    id="contact-icon"
                                    class="expander"
                                    src="{{ asset('image/phone.svg') }}"
                                    alt="menu-expander"
                                /> -->
                                <div class="contact-title">لینکدین</div>

                                <div class="contact-info">
                                    info@tarasheafzar.ir
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="links">
                    <a href="https://laravel.com/docs">Docs</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://blog.laravel.com">Blog</a>
                    <a href="https://nova.laravel.com">Nova</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://vapor.laravel.com">Vapor</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div> -->
            </div>
        </div>
    </body>
</html>
