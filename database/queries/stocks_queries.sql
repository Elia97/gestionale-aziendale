-- =========================================
-- QUERY AGGIUNTIVE PER STOCKS
-- =========================================

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
    CAST(AVG(CAST(s.quantity AS FLOAT)) AS DECIMAL(10,2)) as stock_medio
FROM products p
INNER JOIN stocks s ON p.id = s.product_id
GROUP BY p.id, p.code, p.name, p.category, p.price
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
FROM stocks s1
INNER JOIN products p ON s1.product_id = p.id
INNER JOIN warehouses w1 ON s1.warehouse_id = w1.id
INNER JOIN stocks s2 ON s1.product_id = s2.product_id AND s1.warehouse_id != s2.warehouse_id
INNER JOIN warehouses w2 ON s2.warehouse_id = w2.id
WHERE s1.quantity > 50 AND s2.quantity < 10 AND (s1.quantity - s2.quantity) > 20
ORDER BY quantita_da_spostare DESC;

-- 📈 Trend stock per categoria
SELECT 
    p.category,
    COUNT(DISTINCT s.product_id) as prodotti_categoria,
    COUNT(DISTINCT s.warehouse_id) as magazzini_coinvolti,
    SUM(s.quantity) as quantita_totale,
    SUM(s.quantity * p.price) as valore_totale,
    CAST(AVG(CAST(s.quantity AS FLOAT)) AS DECIMAL(10,2)) as media_stock,
    MIN(s.quantity) as stock_minimo,
    MAX(s.quantity) as stock_massimo
FROM stocks s
INNER JOIN products p ON s.product_id = p.id
GROUP BY p.category
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
FROM stocks s
INNER JOIN products p ON s.product_id = p.id
INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE s.quantity = 0
UNION ALL
SELECT 
    'BASSO' as livello_alert,
    p.code as product_code,
    p.name as product_name,
    w.name as warehouse_name,
    s.quantity as stock_attuale,
    p.price,
    s.updated_at as ultimo_aggiornamento
FROM stocks s
INNER JOIN products p ON s.product_id = p.id
INNER JOIN warehouses w ON s.warehouse_id = w.id
WHERE s.quantity > 0 AND s.quantity < 10
ORDER BY livello_alert, stock_attuale ASC;