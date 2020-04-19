@extends('layouts.inner-page')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/contact-us.css') }}">
@endpush

@section('title')
تماس با ما
@endsection

@section('content')
<div id="main-bkg">
    <div class="contact-card-container">
        <div id="main-title">
            در دسترس شما هستیم
        </div>
        <x-contact-card />
    </div>
</div>

@endsection
