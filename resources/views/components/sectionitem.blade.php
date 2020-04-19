<head>
    <link href="{{ asset('css/sectionitem.css') }}" rel="stylesheet" />
</head>
<div class="section-item">

    <a href="{{ $targeturl }} " class="logo-container">
        @if($image == null || $image == 'name')
            <div href="{{ $targeturl }} " target="_blank" class="section-item-title">
                {{ $title }}
            </div>
        @else
            <img id='item-logo' src="{{ $image }}" alt="{{ $title }}">
        @endif
    </a>

    <div class="section-item-comment">{{ $comment }}</div>
    <div class="description-container">
        <div class="section-item-description">{{ $description }}</div>
    </div>

    <div>
        <a href="{{ $targeturl }}" target="_blank" class="section-item-link">{{ $btnlabel }}
        </a>
    </div>
</div>
