<head>
    <link href="{{ asset('css/section.css') }}" rel="stylesheet" />
</head>
<div id="section-bkg">
    <div id="section" class="section">
        <div class="section-title-container">
            <div class="section-title">
                {{ $title ?? 'تیتر بخش' }}<span
                    class="hayema">‌‌‌‌های ما</span>

            </div>
            <div class="section-description">
                {{ $description ?? 'توضیح کوتاه' }}
            </div>
        </div>
        <div class="section-items">{{ $slot }}</div>
    </div>
</div>
