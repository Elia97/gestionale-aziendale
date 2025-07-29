-- =========================================
-- SCRIPT PER PULIZIA COMPLETA DEL DATABASE
-- =========================================
-- Questo script pulisce completamente il database
-- rispettando l'ordine delle foreign keys

-- Pulizia in ordine inverso alle dipendenze
PRINT 'Pulizia database in corso...';

-- Elimina prima le tabelle con foreign keys
DELETE FROM dbo.order_items;

PRINT 'Eliminati order_items';

DELETE FROM dbo.orders;

PRINT 'Eliminati orders';

DELETE FROM dbo.stocks;

PRINT 'Eliminati stocks';

-- Poi elimina le tabelle parent
DELETE FROM dbo.customers;

PRINT 'Eliminati customers';

DELETE FROM dbo.users;

PRINT 'Eliminati users';

DELETE FROM dbo.products;

PRINT 'Eliminati products';

DELETE FROM dbo.warehouses;

PRINT 'Eliminati warehouses';

PRINT 'Pulizia completata!';