-- =========================================
-- QUERY AGGIUNTIVE PER ORDER_ITEMS
-- =========================================

-- 🔍 Dettagli specifici ordine
SELECT 
    oi.id,
    o.id as order_id,
    c.name as customer_name,
    p.code as product_code,
    p.name as product_name,
    oi.quantity,
    oi.price,
    (oi.quantity * oi.price) as subtotal
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN products p ON oi.product_id = p.id
ORDER BY o.id, oi.id;

-- 💰 Fatturato per cliente tramite order items
SELECT 
    c.name as customer_name,
    COUNT(DISTINCT oi.order_id) as numero_ordini,
    SUM(oi.quantity) as totale_items_acquistati,
    SUM(oi.quantity * oi.price) as fatturato_totale
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN customers c ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY fatturato_totale DESC;

-- 📊 Performance prodotti per mese
SELECT 
    YEAR(oi.created_at) as anno,
    MONTH(oi.created_at) as mese,
    p.category,
    SUM(oi.quantity) as quantita_venduta,
    SUM(oi.quantity * oi.price) as fatturato
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY YEAR(oi.created_at), MONTH(oi.created_at), p.category
ORDER BY anno DESC, mese DESC, fatturato DESC;