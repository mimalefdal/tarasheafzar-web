<head>
    <!-- <link href="{{ asset('css/sticky-title-menu.css') }}" rel="stylesheet" /> -->
    <link href="{{ asset('css/fixed-title-ribbon.css') }}" rel="stylesheet" />
    <script src=" {{ URL::asset('js/title-ribbon.js') }} "></script>

</head>
<div id="title-section" class="title-section stucked">
    <!-- <img id="company-logo" class="logo-main" src="{{ asset('image/talogo-nocap.png') }}"
        alt="company logo" /> -->



    <div id="title-ribbon" class="title-ribbon stucked">

        <svg onclick="togglemenu()" id="menu-expander" class="expander" enable-background="new 0 0 515.555 515.555"
            viewBox="0 0 515.555 515.555" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
            <path
                d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
            <path
                d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
        </svg>

        <svg onclick="togglemenu(false)" id="menu-collapser" class="collapser hidden dimmed"
            enable-background="new 0 0 515.555 515.555" viewBox="0 0 515.555 515.555"
            xmlns="http://www.w3.org/2000/svg">
            <g>
                <g>
                    <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                L284.286,256.002z" />
                </g>
            </g>
        </svg>
        <div id='company-info'>
            <div id="menu-title" class="large-title stucked">
                تراشه افزار سامانه ایرانیان
            </div>
        </div>
        <svg onclick="showContacts()" version="1.1" id="contact-btn" class="expander" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 405.333 405.333"
            style="enable-background:new 0 0 405.333 405.333;" xml:space="preserve">
            <g>
                <g>
                    <path
                        d="M373.333,266.88c-25.003,0-49.493-3.904-72.704-11.563c-11.328-3.904-24.192-0.896-31.637,6.699l-46.016,34.752
    c-52.8-28.181-86.592-61.952-114.389-114.368l33.813-44.928c8.512-8.512,11.563-20.971,7.915-32.64
    C142.592,81.472,138.667,56.96,138.667,32c0-17.643-14.357-32-32-32H32C14.357,0,0,14.357,0,32
    c0,205.845,167.488,373.333,373.333,373.333c17.643,0,32-14.357,32-32V298.88C405.333,281.237,390.976,266.88,373.333,266.88z" />
                </g>
            </g>
        </svg>
    </div>
</div>
