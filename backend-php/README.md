## Backend PHP

### Analisi preliminare: cosa vogliamo modellare?

-   users (utenti con ruoli e permessi)

-   customers (clienti aziendali)

-   products (prodotti / articoli di magazzino)

-   orders (ordini effettuati dai clienti)

-   order_items (righe di dettaglio ordine)

-   warehouses (magazzini o sedi fisiche)

-   stocks (giacenze per prodotto e magazzino)

### Sintesi delle tabelle e relazioni chiave

| Tabella     | Campi chiave                              | Descrizione                              |
| ----------- | ----------------------------------------- | ---------------------------------------- |
| users       | id, name, email, role                     | Gestione utenti (admin, operatore, ecc.) |
| customers   | id, name, email, phone, address           | Anagrafica clienti                       |
| products    | id, code, name, description, price        | Catalogo prodotti                        |
| warehouses  | id, name, address                         | Magazzini fisici                         |
| stocks      | id, product_id, warehouse_id, quantity    | Giacenze prodotti per magazzino          |
| orders      | id, customer_id, user_id, status, total   | Ordini clienti                           |
| order_items | id, order_id, product_id, quantity, price | Dettaglio righe ordine                   |

#### Relazioni

| Entità        | Relazioni                                                  |
| ------------- | ---------------------------------------------------------- |
| **User**      | hasMany Orders                                             |
| **Customer**  | hasMany Orders                                             |
| **Product**   | hasMany Stocks<br>hasMany OrderItems                       |
| **Warehouse** | hasMany Stocks                                             |
| **Stock**     | belongsTo Product<br>belongsTo Warehouse                   |
| **Order**     | belongsTo Customer<br>belongsTo User<br>hasMany OrderItems |
| **OrderItem** | belongsTo Order<br>belongsTo Product                       |

### Comandi Laravel per creare una nuova entità

1. Creazione della migrazione

```bash
php artisan make:migration create_<nome_tabella>_table
```

2. Creazione del modello

```bash
php artisan make:model <nome_modello>
```

3. Creazione della factory

```bash
php artisan make:factory <nome_modello>Factory --model=<nome_modello>
```

4. Creazione del seeder

```bash
php artisan make:seeder <nome_modello>Seeder
```

Per creare tutto in un solo comando:

```bash
php artisan make:model <nome_modello> -m -f -s
```

### API Routes

#### Setup iniziale API con Sanctum

```bash
php artisan install:api
```

-   Installa Laravel Sanctum e pubblica le risorse necessarie (config, migration, routes).

-   Genera automaticamente il file routes/api.php con la configurazione di base.

#### Definizione delle rotte API `(routes/api.php)`

Rotte pubbliche per login/logout:

```php
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
```

Gruppi di rotte protette da middleware:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
});
```

#### Creazione dei Controller API

-   Ogni controller segue il pattern RESTful (index, show, store, update, destroy).

-   Validazione delle richieste in entrata tramite `$request->validate()`.

-   Restituzione di risposte JSON coerenti con gli standard API.

#### Autenticazione e gestione token

-   Nell' AuthController:

    -   `login()` genera un token personale con `$user->createToken('api-token')->plainTextToken`.

    -   `logout()` revoca il token corrente.

-   Gli header HTTP devono includere il token Bearer per accedere alle rotte protette.
