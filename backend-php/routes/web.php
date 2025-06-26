<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Contracts\View\View;

Route::get(uri: '/', action: function (): View {
    return view(view: 'welcome');
});
