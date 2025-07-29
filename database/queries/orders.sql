-- ========================================
-- STATISTICHE INSERIMENTO
-- ========================================

PRINT '========================================';
PRINT 'SEEDER ORDERS COMPLETATO';
PRINT '========================================';

SELECT 
    'Ordini inseriti' as Metrica,
    COUNT(*) as Valore
FROM orders;

SELECT 
    'Distribuzione per stato' as Tipo,
    status,
    COUNT(*) as Conteggio,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders) AS DECIMAL(5,2)) as Percentuale
FROM orders
GROUP BY status
ORDER BY Conteggio DESC;

SELECT 
    'Range totali ordini' as Tipo,
    MIN(total) as Minimo,
    MAX(total) as Massimo,
    CAST(AVG(total) AS DECIMAL(10,2)) as Media
FROM orders;

SELECT 
    'Range date ordini' as Tipo,
    MIN(created_at) as Prima_Data,
    MAX(created_at) as Ultima_Data
FROM orders;

PRINT 'NOTA: I totali degli ordini saranno ricalcolati dopo l''inserimento degli order_items';
PRINT '========================================';

-- ========================================
-- ESEMPI DI ORDINI INSERITI
-- ========================================

SELECT TOP 10
    o.id,
    c.name as cliente,
    u.firstName + ' ' + ISNULL(u.lastName, '') as utente,
    o.status,
    o.total,
    o.created_at
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;