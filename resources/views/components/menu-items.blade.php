<head>
    <link rel="stylesheet" href="{{ asset('css/menuitems-web.css') }}">
</head>
<div id="items-container" class="items-container">
    @foreach($items as $item)
        @if($item['show'] == true)
            <a class="menu-item" href="{{ $item['link'] }}">
                {{ __('menu.'.$item['title']) }}
            </a>
        @endif
    @endforeach

</div>
