-- =========================================
-- QUERY AGGIUNTIVE PER WAREHOUSES
-- =========================================

-- 🏭 Dettagli completi magazzini con stock
SELECT 
    w.id,
    w.name as warehouse_name,
    w.address,
    COUNT(s.id) as numero_prodotti_stoccati,
    SUM(s.quantity) as quantita_totale,
    CAST(AVG(CAST(s.quantity AS FLOAT)) AS DECIMAL(10,2)) as media_stock_per_prodotto
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
GROUP BY w.id, w.name, w.address
ORDER BY quantita_totale DESC;

-- 📦 Prodotti per magazzino con dettagli
SELECT 
    w.name as warehouse_name,
    p.code as product_code,
    p.name as product_name,
    p.category,
    s.quantity,
    p.price,
    (s.quantity * p.price) as valore_stock
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
INNER JOIN products p ON s.product_id = p.id
ORDER BY w.name, valore_stock DESC;

-- ⚠️ Magazzini con problemi di stock critico
SELECT 
    w.name as warehouse_name,
    COUNT(CASE WHEN s.quantity = 0 THEN 1 END) as prodotti_esauriti,
    COUNT(CASE WHEN s.quantity > 0 AND s.quantity < 5 THEN 1 END) as prodotti_critici,
    COUNT(CASE WHEN s.quantity >= 5 AND s.quantity < 20 THEN 1 END) as prodotti_bassi,
    COUNT(s.id) as totale_prodotti
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
GROUP BY w.id, w.name
HAVING COUNT(CASE WHEN s.quantity = 0 THEN 1 END) > 0 
    OR COUNT(CASE WHEN s.quantity > 0 AND s.quantity < 5 THEN 1 END) > 0
ORDER BY prodotti_esauriti DESC, prodotti_critici DESC;

-- 💎 Magazzini con maggiore valore stock
SELECT 
    w.name as warehouse_name,
    w.address,
    SUM(s.quantity * p.price) as valore_totale_stock,
    COUNT(DISTINCT p.category) as categorie_presenti
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
INNER JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name, w.address
ORDER BY valore_totale_stock DESC;