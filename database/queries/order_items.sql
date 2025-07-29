-- =========================================
-- STATISTICHE E ANALISI DEI DETTAGLI ORDINI
-- =========================================

-- 📦 Conteggio totale dettagli ordini
SELECT COUNT(*) as total_order_items FROM order_items;

-- 📊 Distribuzione per ordine
SELECT 
    COUNT(DISTINCT order_id) as ordini_totali,
    COUNT(*) as items_totali,
    CAST(AVG(CAST(items_per_ordine AS FLOAT)) AS DECIMAL(5,2)) as media_items_per_ordine
FROM (
    SELECT order_id, COUNT(*) as items_per_ordine
    FROM order_items
    GROUP BY order_id
) as ordini_items;

-- 📈 Statistiche quantità
SELECT 
    MIN(quantity) as quantita_minima,
    MAX(quantity) as quantita_massima,
    AVG(quantity) as quantita_media,
    CAST(AVG(quantity) AS DECIMAL(10,2)) as quantita_media_rounded,
    SUM(quantity) as quantita_totale_venduta
FROM order_items;

-- 💰 Statistiche prezzi
SELECT 
    MIN(price) as prezzo_minimo,
    MAX(price) as prezzo_massimo,
    AVG(price) as prezzo_medio,
    CAST(AVG(price) AS DECIMAL(10,2)) as prezzo_medio_rounded,
    CAST(SUM(quantity * price) AS DECIMAL(10,2)) as valore_totale_vendite
FROM order_items;

-- 🏷️ Top 10 prodotti più venduti per quantità
SELECT TOP 10
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    SUM(oi.quantity) as quantita_totale_venduta,
    COUNT(DISTINCT oi.order_id) as numero_ordini,
    CAST(AVG(oi.quantity) AS DECIMAL(10,2)) as quantita_media_per_ordine,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_totale
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.code, p.name, p.category
ORDER BY quantita_totale_venduta DESC;

-- 💎 Top 10 prodotti per fatturato
SELECT TOP 10
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    SUM(oi.quantity) as quantita_venduta,
    COUNT(DISTINCT oi.order_id) as numero_ordini,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_totale,
    CAST(AVG(oi.price) AS DECIMAL(10,2)) as prezzo_medio_vendita
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.code, p.name, p.category
ORDER BY fatturato_totale DESC;

-- 📊 Vendite per categoria
SELECT 
    p.category,
    COUNT(oi.id) as numero_items,
    SUM(oi.quantity) as quantita_totale,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_categoria,
    CAST(AVG(oi.quantity) AS DECIMAL(10,2)) as quantita_media,
    CAST(AVG(oi.price) AS DECIMAL(10,2)) as prezzo_medio,
    COUNT(DISTINCT oi.order_id) as ordini_coinvolti
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY p.category
ORDER BY fatturato_categoria DESC;

-- 🔍 Analisi ordini per numero di items
SELECT 
    CASE 
        WHEN num_items = 1 THEN '1 item'
        WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
        WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
        WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
        ELSE 'Più di 10 items'
    END as fascia_items,
    COUNT(*) as numero_ordini,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(DISTINCT order_id) FROM order_items) AS DECIMAL(5,2)) as percentuale
FROM (
    SELECT order_id, COUNT(*) as num_items
    FROM order_items
    GROUP BY order_id
) as ordini_conteggio
GROUP BY 
    CASE 
        WHEN num_items = 1 THEN '1 item'
        WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
        WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
        WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
        ELSE 'Più di 10 items'
    END
ORDER BY 
    CASE 
        WHEN 
            CASE 
                WHEN num_items = 1 THEN '1 item'
                WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
                WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
                WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
                ELSE 'Più di 10 items'
            END = '1 item' THEN 1
        WHEN 
            CASE 
                WHEN num_items = 1 THEN '1 item'
                WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
                WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
                WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
                ELSE 'Più di 10 items'
            END = '2-3 items' THEN 2
        WHEN 
            CASE 
                WHEN num_items = 1 THEN '1 item'
                WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
                WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
                WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
                ELSE 'Più di 10 items'
            END = '4-5 items' THEN 3
        WHEN 
            CASE 
                WHEN num_items = 1 THEN '1 item'
                WHEN num_items BETWEEN 2 AND 3 THEN '2-3 items'
                WHEN num_items BETWEEN 4 AND 5 THEN '4-5 items'
                WHEN num_items BETWEEN 6 AND 10 THEN '6-10 items'
                ELSE 'Più di 10 items'
            END = '6-10 items' THEN 4
        ELSE 5
    END;

-- 💰 Analisi variazioni di prezzo (confronto prezzo ordine vs prezzo prodotto)
SELECT 
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.price as prezzo_listino_attuale,
    CAST(AVG(oi.price) AS DECIMAL(10,2)) as prezzo_medio_vendita,
    CAST(AVG(oi.price) - p.price AS DECIMAL(10,2)) as differenza_media,
    CAST((AVG(oi.price) - p.price) / p.price * 100 AS DECIMAL(5,2)) as percentuale_variazione,
    SUM(oi.quantity) as quantita_venduta
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.code, p.name, p.price
HAVING SUM(oi.quantity) > 5  -- Solo prodotti con vendite significative
ORDER BY ABS(AVG(oi.price) - p.price) DESC;

-- 📅 Vendite per periodo (ultimi 6 mesi)
SELECT 
    YEAR(o.created_at) as anno,
    MONTH(o.created_at) as mese,
    COUNT(oi.id) as numero_items,
    SUM(oi.quantity) as quantita_venduta,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_mensile,
    COUNT(DISTINCT oi.order_id) as ordini_del_mese,
    COUNT(DISTINCT oi.product_id) as prodotti_diversi_venduti
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= DATEADD(month, -6, GETDATE())
GROUP BY YEAR(o.created_at), MONTH(o.created_at)
ORDER BY anno DESC, mese DESC;

-- 🎯 Prodotti mai venduti (presenti in catalogo ma non in order_items)
SELECT 
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    p.price as prezzo_listino,
    p.created_at as data_inserimento_catalogo
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL
ORDER BY p.created_at DESC;

-- 🔄 Prodotti venduti di recente (ultimi 30 giorni)
SELECT DISTINCT
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    SUM(oi.quantity) as quantita_venduta_30gg,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_30gg,
    COUNT(DISTINCT oi.order_id) as ordini_30gg,
    MAX(o.created_at) as ultima_vendita
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= DATEADD(day, -30, GETDATE())
GROUP BY p.id, p.code, p.name, p.category
ORDER BY ultima_vendita DESC;

-- ✅ Verifica integrità dati order_items
SELECT 
    'Items con quantità zero o negativa' as controllo,
    COUNT(*) as count
FROM order_items 
WHERE quantity <= 0
UNION ALL
SELECT 
    'Items con prezzo zero o negativo' as controllo,
    COUNT(*) as count
FROM order_items 
WHERE price <= 0
UNION ALL
SELECT 
    'Items senza ordine collegato' as controllo,
    COUNT(*) as count
FROM order_items oi 
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.id IS NULL
UNION ALL
SELECT 
    'Items senza prodotto collegato' as controllo,
    COUNT(*) as count
FROM order_items oi 
LEFT JOIN products p ON oi.product_id = p.id
WHERE p.id IS NULL;

-- 📊 Riepilogo generale order_items
SELECT 
    'Totale items venduti' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM order_items
UNION ALL
SELECT 
    'Quantità totale venduta' as metrica,
    CAST(SUM(quantity) AS VARCHAR(20)) as valore
FROM order_items
UNION ALL
SELECT 
    'Fatturato totale' as metrica,
    CAST(CAST(SUM(quantity * price) AS DECIMAL(10,2)) AS VARCHAR(20)) as valore
FROM order_items
UNION ALL
SELECT 
    'Ordini con items' as metrica,
    CAST(COUNT(DISTINCT order_id) AS VARCHAR(20)) as valore
FROM order_items
UNION ALL
SELECT 
    'Prodotti venduti' as metrica,
    CAST(COUNT(DISTINCT product_id) AS VARCHAR(20)) as valore
FROM order_items
UNION ALL
SELECT 
    'Prezzo medio item' as metrica,
    CAST(CAST(AVG(price) AS DECIMAL(10,2)) AS VARCHAR(20)) as valore
FROM order_items;

-- 🏆 Clienti per valore degli acquisti (tramite order_items)
SELECT TOP 10
    c.name as nome_cliente,
    c.email as email_cliente,
    COUNT(DISTINCT oi.order_id) as numero_ordini,
    SUM(oi.quantity) as quantita_totale_acquistata,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as valore_totale_acquisti,
    CAST(AVG(oi.quantity * oi.price) AS DECIMAL(10,2)) as valore_medio_per_item
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN customers c ON o.customer_id = c.id
GROUP BY c.id, c.name, c.email
ORDER BY valore_totale_acquisti DESC;

-- 📈 Trend vendite ultime 12 settimane
SELECT 
    YEAR(o.created_at) as anno,
    DATEPART(week, o.created_at) as settimana,
    COUNT(oi.id) as items_venduti,
    SUM(oi.quantity) as quantita_venduta,
    CAST(SUM(oi.quantity * oi.price) AS DECIMAL(10,2)) as fatturato_settimanale
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= DATEADD(week, -12, GETDATE())
GROUP BY YEAR(o.created_at), DATEPART(week, o.created_at)
ORDER BY anno DESC, settimana DESC;
