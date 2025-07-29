-- ========================================
-- STATISTICHE E ANALISI DEGLI STOCK
-- ========================================

-- 📦 Conteggio totale stock
SELECT COUNT(*) as total_stocks FROM stocks;

-- 📊 Distribuzione stock per magazzino
SELECT
    w.name as magazzino,
    COUNT(s.id) as num_stock,
    SUM(s.quantity) as quantita_totale,
    CAST(
        COUNT(s.id) * 100.0 / (
            SELECT COUNT(*)
            FROM stocks
        ) AS DECIMAL(5, 2)
    ) as percentuale_stock
FROM stocks s
    INNER JOIN warehouses w ON s.warehouse_id = w.id
GROUP BY
    w.id,
    w.name
ORDER BY quantita_totale DESC;

-- 📈 Statistiche quantità
SELECT
    MIN(quantity) as quantita_minima,
    MAX(quantity) as quantita_massima,
    AVG(quantity) as quantita_media,
    CAST(
        AVG(quantity) AS DECIMAL(10, 2)
    ) as quantita_media_rounded,
    SUM(quantity) as quantita_totale_sistema
FROM stocks;

-- 🏷️ Stock per categoria prodotto
SELECT
    p.category,
    COUNT(s.id) as num_stock,
    SUM(s.quantity) as quantita_totale,
    CAST(
        AVG(s.quantity) AS DECIMAL(10, 2)
    ) as quantita_media,
    COUNT(DISTINCT s.warehouse_id) as num_magazzini
FROM stocks s
    INNER JOIN products p ON s.product_id = p.id
GROUP BY
    p.category
ORDER BY quantita_totale DESC;

-- 💰 Valore totale stock per magazzino
SELECT
    w.name as magazzino,
    w.address as indirizzo,
    COUNT(s.id) as num_prodotti_stoccati,
    SUM(s.quantity) as quantita_totale,
    CAST(
        SUM(s.quantity * p.price) AS DECIMAL(10, 2)
    ) as valore_totale_stock
FROM
    stocks s
    INNER JOIN warehouses w ON s.warehouse_id = w.id
    INNER JOIN products p ON s.product_id = p.id
GROUP BY
    w.id,
    w.name,
    w.address
ORDER BY valore_totale_stock DESC;

-- 🔍 Top 10 prodotti con più stock
SELECT
    TOP 10 p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    SUM(s.quantity) as quantita_totale,
    COUNT(s.warehouse_id) as num_magazzini,
    CAST(
        SUM(s.quantity * p.price) AS DECIMAL(10, 2)
    ) as valore_totale
FROM stocks s
    INNER JOIN products p ON s.product_id = p.id
GROUP BY
    p.id,
    p.code,
    p.name,
    p.category
ORDER BY quantita_totale DESC;

-- ⚠️ Prodotti con stock basso (< 10 unità)
SELECT
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    w.name as magazzino,
    s.quantity as quantita_residua,
    p.price as prezzo_unitario
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    s.quantity < 10
ORDER BY s.quantity ASC;

-- 📊 Distribuzione quantità per fasce
SELECT
    CASE
        WHEN quantity = 0 THEN 'Esaurito'
        WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
        WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
        WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
        ELSE 'Stock molto alto (>100)'
    END as fascia_stock,
    COUNT(*) as num_record,
    SUM(quantity) as quantita_totale,
    CAST(
        COUNT(*) * 100.0 / (
            SELECT COUNT(*)
            FROM stocks
        ) AS DECIMAL(5, 2)
    ) as percentuale
FROM stocks
GROUP BY
    CASE
        WHEN quantity = 0 THEN 'Esaurito'
        WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
        WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
        WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
        ELSE 'Stock molto alto (>100)'
    END
ORDER BY
    CASE
        WHEN CASE
            WHEN quantity = 0 THEN 'Esaurito'
            WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
            WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
            WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
            ELSE 'Stock molto alto (>100)'
        END = 'Esaurito' THEN 1
        WHEN CASE
            WHEN quantity = 0 THEN 'Esaurito'
            WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
            WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
            WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
            ELSE 'Stock molto alto (>100)'
        END = 'Stock basso (1-10)' THEN 2
        WHEN CASE
            WHEN quantity = 0 THEN 'Esaurito'
            WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
            WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
            WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
            ELSE 'Stock molto alto (>100)'
        END = 'Stock medio (11-50)' THEN 3
        WHEN CASE
            WHEN quantity = 0 THEN 'Esaurito'
            WHEN quantity BETWEEN 1 AND 10  THEN 'Stock basso (1-10)'
            WHEN quantity BETWEEN 11 AND 50  THEN 'Stock medio (11-50)'
            WHEN quantity BETWEEN 51 AND 100  THEN 'Stock alto (51-100)'
            ELSE 'Stock molto alto (>100)'
        END = 'Stock alto (51-100)' THEN 4
        ELSE 5
    END;

-- 🔄 Movimenti stock recenti (ultimi 30 giorni)
SELECT
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    w.name as magazzino,
    s.quantity as quantita_attuale,
    s.created_at as data_inserimento,
    s.updated_at as ultimo_aggiornamento
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    s.updated_at >= DATEADD(day, -30, GETDATE())
ORDER BY s.updated_at DESC;

-- 🏭 Prodotti duplicati tra magazzini
SELECT
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    COUNT(DISTINCT s.warehouse_id) as num_magazzini,
    SUM(s.quantity) as quantita_totale,
    STRING_AGG(
        w.name + ' (' + CAST(s.quantity AS VARCHAR(10)) + ')',
        ', '
    ) as distribuzione_magazzini
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
GROUP BY
    p.id,
    p.code,
    p.name
HAVING
    COUNT(DISTINCT s.warehouse_id) > 1
ORDER BY
    num_magazzini DESC,
    quantita_totale DESC;

-- ✅ Verifica integrità dati stock
SELECT 'Stock con quantità negativa' as controllo, COUNT(*) as count
FROM stocks
WHERE
    quantity < 0
UNION ALL
SELECT 'Stock senza prodotto collegato' as controllo, COUNT(*) as count
FROM stocks s
    LEFT JOIN products p ON s.product_id = p.id
WHERE
    p.id IS NULL
UNION ALL
SELECT 'Stock senza magazzino collegato' as controllo, COUNT(*) as count
FROM stocks s
    LEFT JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    w.id IS NULL
UNION ALL
SELECT 'Record stock duplicati (stesso prodotto-magazzino)' as controllo, COUNT(*) - COUNT(
        DISTINCT CONCAT(product_id, '-', warehouse_id)
    ) as count
FROM stocks;

-- 📊 Riepilogo generale stock
SELECT 'Totale record stock' as metrica, CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM stocks
UNION ALL
SELECT 'Quantità totale sistema' as metrica, CAST(SUM(quantity) AS VARCHAR(20)) as valore
FROM stocks
UNION ALL
SELECT 'Prodotti unici stoccati' as metrica, CAST(
        COUNT(DISTINCT product_id) AS VARCHAR(20)
    ) as valore
FROM stocks
UNION ALL
SELECT 'Magazzini attivi' as metrica, CAST(
        COUNT(DISTINCT warehouse_id) AS VARCHAR(20)
    ) as valore
FROM stocks
UNION ALL
SELECT 'Valore totale stock' as metrica, CAST(
        CAST(
            SUM(s.quantity * p.price) AS DECIMAL(10, 2)
        ) AS VARCHAR(20)
    ) as valore
FROM stocks s
    INNER JOIN products p ON s.product_id = p.id;

-- 🎯 Stock zero da rifornire
SELECT
    p.code as codice_prodotto,
    p.name as nome_prodotto,
    p.category as categoria,
    w.name as magazzino,
    p.price as prezzo_unitario
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    s.quantity = 0
ORDER BY p.category, p.name;

-- 📈 Analisi efficienza magazzini
SELECT
    w.name as magazzino,
    COUNT(s.id) as prodotti_gestiti,
    SUM(s.quantity) as quantita_totale,
    CAST(
        AVG(s.quantity) AS DECIMAL(10, 2)
    ) as quantita_media_per_prodotto,
    COUNT(
        CASE
            WHEN s.quantity = 0 THEN 1
        END
    ) as prodotti_esauriti,
    COUNT(
        CASE
            WHEN s.quantity < 10 THEN 1
        END
    ) as prodotti_stock_basso,
    CAST(
        SUM(s.quantity * p.price) AS DECIMAL(10, 2)
    ) as valore_totale_stock
FROM
    stocks s
    INNER JOIN warehouses w ON s.warehouse_id = w.id
    INNER JOIN products p ON s.product_id = p.id
GROUP BY
    w.id,
    w.name
ORDER BY valore_totale_stock DESC;

-- 📊 Report stock completo per prodotto
SELECT
    p.code as product_code,
    p.name as product_name,
    p.category,
    p.price,
    SUM(s.quantity) as quantita_totale_sistema,
    COUNT(s.warehouse_id) as magazzini_coinvolti,
    SUM(s.quantity * p.price) as valore_totale_stock,
    MIN(s.quantity) as stock_minimo,
    MAX(s.quantity) as stock_massimo,
    CAST(
        AVG(CAST(s.quantity AS FLOAT)) AS DECIMAL(10, 2)
    ) as stock_medio
FROM products p
    INNER JOIN stocks s ON p.id = s.product_id
GROUP BY
    p.id,
    p.code,
    p.name,
    p.category,
    p.price
ORDER BY quantita_totale_sistema DESC;

-- 🔄 Movimenti stock necessari (bilanciamento)
SELECT
    p.code as product_code,
    p.name as product_name,
    w1.name as magazzino_eccesso,
    s1.quantity as quantita_eccesso,
    w2.name as magazzino_carenza,
    s2.quantity as quantita_carenza,
    (s1.quantity - s2.quantity) / 2 as quantita_da_spostare
FROM
    stocks s1
    INNER JOIN products p ON s1.product_id = p.id
    INNER JOIN warehouses w1 ON s1.warehouse_id = w1.id
    INNER JOIN stocks s2 ON s1.product_id = s2.product_id
    AND s1.warehouse_id != s2.warehouse_id
    INNER JOIN warehouses w2 ON s2.warehouse_id = w2.id
WHERE
    s1.quantity > 50
    AND s2.quantity < 10
    AND (s1.quantity - s2.quantity) > 20
ORDER BY quantita_da_spostare DESC;

-- 📈 Trend stock per categoria
SELECT
    p.category,
    COUNT(DISTINCT s.product_id) as prodotti_categoria,
    COUNT(DISTINCT s.warehouse_id) as magazzini_coinvolti,
    SUM(s.quantity) as quantita_totale,
    SUM(s.quantity * p.price) as valore_totale,
    CAST(
        AVG(CAST(s.quantity AS FLOAT)) AS DECIMAL(10, 2)
    ) as media_stock,
    MIN(s.quantity) as stock_minimo,
    MAX(s.quantity) as stock_massimo
FROM stocks s
    INNER JOIN products p ON s.product_id = p.id
GROUP BY
    p.category
ORDER BY valore_totale DESC;

-- ⚠️ Alert stock critico
SELECT
    'CRITICO' as livello_alert,
    p.code as product_code,
    p.name as product_name,
    w.name as warehouse_name,
    s.quantity as stock_attuale,
    p.price,
    s.updated_at as ultimo_aggiornamento
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    s.quantity = 0
UNION ALL
SELECT
    'BASSO' as livello_alert,
    p.code as product_code,
    p.name as product_name,
    w.name as warehouse_name,
    s.quantity as stock_attuale,
    p.price,
    s.updated_at as ultimo_aggiornamento
FROM
    stocks s
    INNER JOIN products p ON s.product_id = p.id
    INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE
    s.quantity > 0
    AND s.quantity < 10
ORDER BY livello_alert, stock_attuale ASC;