<head>
    <link rel="stylesheet" href="{{ asset('css/menuitems-web.css') }}">
</head>
<div id="items-container" class="items-container">
    @if(Route::current()->getName() != 'welcome')
        <a href="{{ route('welcome') }}" class="menu-item">خانه</a>
    @endif
    @foreach($items as $item)
        @if($item['show'] == true)
            <a class="menu-item" href="{{ $item['link'] }}">
                {{ __('menu.'.$item['title']) }}
            </a>
        @endif
    @endforeach

</div>
