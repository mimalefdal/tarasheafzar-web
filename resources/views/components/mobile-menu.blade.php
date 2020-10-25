<head>
    <link href="{{ asset('css/mobilemenu.css') }}" rel="stylesheet" />
    <script src=" {{ URL::asset('js/title-ribbon.js') }} "></script>

</head>

<div id='mobile-menu' class='mobile-menu'>
    <div id="menu-content" class="menu-content">
        <div>
            <svg onclick="togglemenu()" id="mobile-menu-collapser" class="collapser"
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
        </div>
        <x-menu-items />

    </div>
</div>
