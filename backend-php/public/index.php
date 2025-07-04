<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define(constant_name: 'LARAVEL_START', value: microtime(as_float: true));

// Determine if the application is in maintenance mode...
if (file_exists(filename: $maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->handleRequest(request: Request::capture());
