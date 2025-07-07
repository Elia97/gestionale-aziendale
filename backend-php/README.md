# Backend PHP

## Analisi preliminare

- Users → (utenti con ruoli e permessi)

- Customers → (clienti aziendali)

- Products → (prodotti / articoli di magazzino)

- Orders → (ordini effettuati dai clienti)

- Order_items → (righe di dettaglio ordine)

- Warehouses → (magazzini o sedi fisiche)

- Stocks → (giacenze per prodotto e magazzino)

- UserSettings → (impostazioni per ogni utente)

---

## Tabelle

### Users

> Gestione utenti (admin, operatore)

- firstName
- lastName
- email
- phone
- password
- role
- department

### Customers

> Anagrafica dei clienti

- name
- email
- phone
- address

### Products

> Catalogo prodotti

- code
- name
- description
- price
- category

### Warehouses

> Magazzini fisici

- name
- address

### Stocks

> Giacenze prodotti per magazzino

- product_id
- warehouse_id
- quantity

### Orders

> Ordini dei clienti

- customer_id
- user_id
- status
- total

### OrderItems

> Dettaglio righe ordine

- order_id
- product_id
- quantity
- price

### UserSettings

> Impostazioni utente

- user_id
- language
- timezone
- email_notifications
- push_notifications
- sms_notifications
- order_updates
- stock_alerts
- system_maintenance
- marketing_emails
- two_factor_auth
- session_timeout
- password_expiry
- login_attempts
- ip_whitelist
- currency
- date_format
- time_format
- backup_frequency
- maintenance_mode

---

## Relazioni

### User

- hasMany Orders
- hasOne UserSettings

### Customer

- hasMany Orders

### Product

- hasMany Stocks
- hasMany OrderItems

### Warehouse

- hasMany Stocks

### Stock

- belongsTo Product
- belongsTo Warehouse

### Order

- belongsTo Customer
- belongsTo User
- hasMany OrderItems

### OrderItem

- belongsTo Order
- belongsTo Product

### UserSetting

- belongsTo User

---

## Creazione entità

### Migration

```bash
php artisan make:migration create_<nome_tabella>_table
```

### Model

```bash
php artisan make:model <nomeModello>
```

### Factory

```bash
php artisan make:factory <nomeModello>Factory --model=<nomeModello>
```

### Seeder

```bash
php artisan make:seeder <nomeModello>Seeder
```

### Per creare tutto con un solo comando

```bash
php artisan make:model <nomeModello> -m -f -s
```

---

## API Routes

### Setup iniziale API con Sanctum

```bash
php artisan install:api
```

- Installa Laravel Sanctum e pubblica le risorse necessarie (config, migration, routes).

- Genera automaticamente il file routes/api.php con la configurazione di base.

### Definizione delle rotte API `(routes/api.php)`

Rotte pubbliche per login/logout:

```php
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
```

Gruppi di rotte protette da middleware:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('warehouses', WarehouseController::class);


    Route::get('warehouses/{warehouse}/stocks', [WarehouseController::class, 'getStocks']);
    Route::patch('warehouses/{warehouse}/stocks', [WarehouseController::class, 'updateStocks']);

    Route::get('users/settings', [UserSettingController::class, 'show']);
    Route::patch('users/settings', [UserSettingController::class, 'update']);
});
```

### Creazione dei Controller API

- Ogni controller segue il pattern RESTful (index, show, store, update, destroy).

- Validazione delle richieste in entrata tramite `$request->validate()`.

- Restituzione di risposte JSON coerenti con gli standard API.

### Autenticazione e gestione token

- Nell' AuthController:

  - `login()` genera un token personale con `$user->createToken('api-token')->plainTextToken`.

  - `logout()` revoca il token corrente.

- Gli header HTTP devono includere il token Bearer per accedere alle rotte protette.
