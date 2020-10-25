<head>
    <link href="{{ asset('css/sectionitem.css') }}" rel="stylesheet" />
</head>
<div class="section-item">

    <div class="logo-container">
        {{-- <a href="{{ $targeturl }}" class="logo-container">
            --}}
            @if ($image == null || $image == 'name')
                <div href="{{ $targeturl }} " target="_blank" class="section-item-title">
                    {{ $title }}
                </div>
            @else
                <img id='item-logo' src="{{ $image }}" alt="{{ $title }}">
            @endif
            {{--
        </a> --}}
    </div>

    <div class="section-item-comment">{{ $comment }}</div>
    <div class="description-container">
        <div class="section-item-description">{{ $description }}</div>
    </div>


    <div>
        @if ($targeturl != null)
            <a href="{{ $targeturl }}" target="_blank" class="section-item-link">{{ $btnlabel }}
            </a>
        @else
            <a href="{{ route('contacts') }}" class="section-item-link">درخواست تماس
            </a>
        @endif
    </div>
</div>
