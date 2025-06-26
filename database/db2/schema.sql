-- Utenti
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Clienti
CREATE TABLE customers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Prodotti
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description CLOB,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Magazzini
CREATE TABLE warehouses (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Giacenze
CREATE TABLE stocks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_stocks_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_stocks_warehouse FOREIGN KEY (warehouse_id)
        REFERENCES warehouses(id) ON DELETE CASCADE
);

-- Ordini
CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id)
        REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE
);

-- Righe ordine
CREATE TABLE order_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE CASCADE
);
