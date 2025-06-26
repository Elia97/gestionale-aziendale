## Backend php

### Analisi preliminare: cosa vogliamo modellare?

- users (utenti con ruoli e permessi)

- customers (clienti aziendali)

- products (prodotti / articoli di magazzino)

- orders (ordini effettuati dai clienti)

- order_items (righe di dettaglio ordine)

- warehouses (magazzini o sedi fisiche)

- stocks (giacenze per prodotto e magazzino)

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