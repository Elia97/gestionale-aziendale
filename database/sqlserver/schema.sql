-- Creazione tabelle principali

CREATE TABLE users (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE customers (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE products (
    id INT IDENTITY PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE warehouses (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE stocks (
    id INT IDENTITY PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity INT DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_stocks_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_stocks_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT IDENTITY PRIMARY KEY,
    customer_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT IDENTITY PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
