-- ========================================
-- QUERIES PER LA TABELLA ORDERS
-- ========================================
-- Questo file contiene query di esempio e statistiche per la gestione degli ordini
-- Include analisi su stati, totali, date e relazioni con clienti e utenti

-- ========================================
-- STATISTICHE INSERIMENTO
-- ========================================

-- Conteggio totale degli ordini inseriti
SELECT 'Ordini inseriti' as Metrica, COUNT(*) as Valore FROM orders;

-- Distribuzione degli ordini per stato con percentuali
SELECT
    'Distribuzione per stato' as Tipo,
    status,
    COUNT(*) as Conteggio,
    CAST(
        COUNT(*) * 100.0 / (
            SELECT COUNT(*)
            FROM orders
        ) AS DECIMAL(5, 2)
    ) as Percentuale
FROM orders
GROUP BY
    status
ORDER BY Conteggio DESC;

-- Analisi dei totali degli ordini (min, max, media)
SELECT
    'Range totali ordini' as Tipo,
    MIN(total) as Minimo,
    MAX(total) as Massimo,
    CAST(AVG(total) AS DECIMAL(10, 2)) as Media
FROM orders;

-- Analisi del range temporale degli ordini
SELECT
    'Range date ordini' as Tipo,
    MIN(created_at) as Prima_Data,
    MAX(created_at) as Ultima_Data
FROM orders;

-- Nota informativa sui totali
PRINT 'NOTA: I totali degli ordini saranno ricalcolati dopo l''inserimento degli order_items';

PRINT '========================================';

-- ========================================
-- ESEMPI DI ORDINI INSERITI
-- ========================================

-- Visualizza gli ultimi 10 ordini con informazioni su cliente e utente
SELECT
    TOP 10 o.id,
    c.name as cliente,
    u.firstName + ' ' + ISNULL(u.lastName, '') as utente,
    o.status,
    o.total,
    o.created_at
FROM
    orders o
    INNER JOIN customers c ON o.customer_id = c.id
    INNER JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;