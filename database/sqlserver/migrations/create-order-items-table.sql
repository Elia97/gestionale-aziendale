-- Active: 1751819236960@@127.0.0.1@1433@gestionale-aziendale
-- Script per la creazione della tabella "order_items" in SQL Server
CREATE TABLE dbo.order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES dbo.orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES dbo.products(id) ON DELETE CASCADE
);

-- Commento alla tabella
EXECUTE sp_addextendedproperty 
    N'MS_Description', N'Dettagli degli articoli ordinati collegati a ogni ordine',
    N'schema', N'dbo',
    N'table', N'order_items';

-- Commenti alle colonne principali
EXECUTE sp_addextendedproperty 
    N'MS_Description', N'ID dell''ordine associato',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'order_id';

EXECUTE sp_addextendedproperty 
    N'MS_Description', N'ID del prodotto ordinato',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'product_id';

EXECUTE sp_addextendedproperty 
    N'MS_Description', N'Quantità del prodotto ordinato',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'quantity';

EXECUTE sp_addextendedproperty 
    N'MS_Description', N'Prezzo unitario applicato al prodotto',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'price';

EXECUTE sp_addextendedproperty 
    N'MS_Description', N'Data creazione record',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'created_at';

EXECUTE sp_addextendedproperty 
    N'MS_Description', N'Data ultima modifica record',
    N'schema', N'dbo',
    N'table', N'order_items',
    N'column', N'updated_at';
