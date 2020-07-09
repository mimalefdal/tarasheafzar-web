@extends('layouts.base')

@section('title')
{{ $companyData["company-info"]["name"] }}
@endsection

@push('styles')
    <link href="{{ asset('css/welcome.css') }}" rel="stylesheet" />
@endpush

@push('scripts')
    <!-- <script>
        window.onscroll = function () {
            scrollFunction(document.documentElement.scrollTop,
                "{{ $companyData['company-info']['name'] }}");
        };

    </script> -->
@endpush

@section('pre-content')

@endsection

@section('content')
<x-sticky-welcome :data=" $companyData['company-info']" />

@if( $companyData['settings']['show-brands'] )

    <x-section id='brands' :data="$companyData['brands-section']">
        @foreach($companyData['brands'] as $brand)
            <x-section-item :data="$brand" />
        @endforeach
    </x-section>
@endif

@if( $companyData['settings']['show-startups'] )
    <x-section :data="$companyData['startups-section']">
        @foreach($companyData["startups"] as $startup)
            <x-section-item :data="$startup" />
        @endforeach
    </x-section>
@endif

@if( $companyData['settings']['show-platforms'] )
    <x-section :data="$companyData['platforms-section']">
        @foreach($companyData["platforms"] as $platform)
            <x-section-item :data="$platform" />
        @endforeach
    </x-section>
@endif



@endsection
