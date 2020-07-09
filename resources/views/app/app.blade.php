@extends('layouts.base')

@section('title')
{{ $companyData["company-info"]["name"] }}
@endsection

@push('styles')
    <link href="{{ asset('css/welcome.css') }}" rel="stylesheet" />
@endpush

@push('scripts')

@endpush

@section('pre-content')

@endsection

@section('content')
<div id="app"></div>
<script src="{{ asset('js/app.js') }}"></script>
@endsection
