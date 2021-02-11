<head>
    <link rel="stylesheet" href="{{ asset('css/menuitems-web.css') }}">
</head>
<div id="items-container" class="items-container">
    @if (Route::current()->getName() != 'welcome')
        <a href="{{ route('welcome') }}" class="menu-item">خانه</a>
    @endif
    @foreach ($items as $item)
        @if ($item['show'] == true)
            @if (isset($item['link']) && $item['link'] != '#')
                <a class="menu-item" href="{{ $item['link'] }}">
                    {{ __('menu.' . $item['title']) }}
                </a>
            @elseif(isset($item['sub']))
                <a class="menu-item" href="{{ Str::replaceFirst('//', '//' . $item['sub'] . '.', env('APP_URL')) }}">
                    {{ __('menu.' . $item['title']) }}
                </a>
            @else
                <a class="menu-item" disabled>
                    {{ __('menu.' . $item['title']) }}
                </a>
            @endif
        @endif
    @endforeach

</div>
