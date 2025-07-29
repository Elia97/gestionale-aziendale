-- ========================================
-- STATISTICHE E ANALISI DEI MAGAZZINI
-- ========================================

-- 🏭 Conteggio totale magazzini
SELECT COUNT(*) as total_warehouses FROM warehouses;

-- 📊 Magazzini con informazioni complete
SELECT 
    CASE 
        WHEN address IS NOT NULL AND address != '' THEN 'Con indirizzo'
        ELSE 'Senza indirizzo'
    END as completezza_dati,
    COUNT(*) as count_warehouses,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM warehouses) AS DECIMAL(5,2)) as percentage
FROM warehouses
GROUP BY 
    CASE 
        WHEN address IS NOT NULL AND address != '' THEN 'Con indirizzo'
        ELSE 'Senza indirizzo'
    END
ORDER BY count_warehouses DESC;

-- 📦 Statistiche stock per magazzino
SELECT 
    w.name as nome_magazzino,
    w.address as indirizzo,
    COUNT(s.id) as prodotti_stoccati,
    ISNULL(SUM(s.quantity), 0) as quantita_totale,
    CASE 
        WHEN COUNT(s.id) > 0 THEN CAST(AVG(s.quantity) AS DECIMAL(10,2))
        ELSE 0
    END as quantita_media_per_prodotto
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
GROUP BY w.id, w.name, w.address
ORDER BY quantita_totale DESC;

-- 💰 Valore stock per magazzino
SELECT 
    w.name as nome_magazzino,
    w.address as indirizzo,
    COUNT(s.id) as prodotti_stoccati,
    ISNULL(SUM(s.quantity), 0) as quantita_totale,
    ISNULL(CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)), 0) as valore_totale_stock
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
LEFT JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name, w.address
ORDER BY valore_totale_stock DESC;

-- 🏷️ Distribuzione prodotti per categoria nei magazzini
SELECT 
    w.name as magazzino,
    p.category as categoria,
    COUNT(s.id) as num_prodotti,
    SUM(s.quantity) as quantita_totale,
    CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)) as valore_categoria
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
INNER JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name, p.category
ORDER BY w.name, valore_categoria DESC;

-- 📈 Magazzini più efficienti (per valore stock)
SELECT TOP 10
    w.name as nome_magazzino,
    w.address as indirizzo,
    COUNT(s.id) as prodotti_gestiti,
    SUM(s.quantity) as quantita_totale,
    CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)) as valore_totale,
    CAST(AVG(s.quantity * p.price) AS DECIMAL(10,2)) as valore_medio_per_prodotto
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
INNER JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name, w.address
ORDER BY valore_totale DESC;

-- ⚠️ Magazzini con problemi di stock
SELECT 
    w.name as nome_magazzino,
    w.address as indirizzo,
    COUNT(s.id) as prodotti_totali,
    COUNT(CASE WHEN s.quantity = 0 THEN 1 END) as prodotti_esauriti,
    COUNT(CASE WHEN s.quantity < 10 THEN 1 END) as prodotti_stock_basso,
    CAST(COUNT(CASE WHEN s.quantity = 0 THEN 1 END) * 100.0 / COUNT(s.id) AS DECIMAL(5,2)) as percentuale_esauriti,
    CAST(COUNT(CASE WHEN s.quantity < 10 THEN 1 END) * 100.0 / COUNT(s.id) AS DECIMAL(5,2)) as percentuale_stock_basso
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
GROUP BY w.id, w.name, w.address
ORDER BY percentuale_esauriti DESC, percentuale_stock_basso DESC;

-- 🏙️ Analisi indirizzi magazzini
SELECT 
    LEFT(address, 20) as inizio_indirizzo,
    COUNT(*) as num_magazzini
FROM warehouses
WHERE address IS NOT NULL AND address != ''
GROUP BY LEFT(address, 20)
ORDER BY num_magazzini DESC;

-- 📅 Magazzini registrati per mese
SELECT 
    YEAR(created_at) as anno,
    MONTH(created_at) as mese,
    COUNT(*) as nuovi_magazzini
FROM warehouses
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY anno DESC, mese DESC;

-- 🔍 Magazzini con nomi più lunghi
SELECT 
    name,
    address,
    LEN(name) as lunghezza_nome
FROM warehouses 
ORDER BY lunghezza_nome DESC;

-- 📊 Comparazione magazzini per performance
SELECT 
    w.name as nome_magazzino,
    COUNT(s.id) as prodotti_gestiti,
    SUM(s.quantity) as quantita_totale,
    COUNT(DISTINCT p.category) as categorie_gestite,
    CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)) as valore_totale,
    CASE 
        WHEN COUNT(s.id) > 0 THEN CAST(SUM(s.quantity * p.price) / COUNT(s.id) AS DECIMAL(10,2))
        ELSE 0
    END as valore_medio_per_prodotto,
    COUNT(CASE WHEN s.quantity > 50 THEN 1 END) as prodotti_stock_alto
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
LEFT JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name
ORDER BY valore_totale DESC;

-- 🎯 Magazzini vuoti o sottoutilizzati
SELECT 
    w.name as nome_magazzino,
    w.address as indirizzo,
    ISNULL(COUNT(s.id), 0) as prodotti_stoccati,
    ISNULL(SUM(s.quantity), 0) as quantita_totale,
    w.created_at as data_creazione
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
GROUP BY w.id, w.name, w.address, w.created_at
HAVING ISNULL(COUNT(s.id), 0) < 5 OR ISNULL(SUM(s.quantity), 0) < 50
ORDER BY prodotti_stoccati ASC, quantita_totale ASC;

-- ✅ Verifica integrità dati magazzini
SELECT 
    'Magazzini senza nome' as controllo,
    COUNT(*) as count
FROM warehouses 
WHERE name IS NULL OR name = ''
UNION ALL
SELECT 
    'Magazzini senza indirizzo' as controllo,
    COUNT(*) as count
FROM warehouses 
WHERE address IS NULL OR address = ''
UNION ALL
SELECT 
    'Nomi magazzini duplicati' as controllo,
    COUNT(*) - COUNT(DISTINCT name) as count
FROM warehouses
UNION ALL
SELECT 
    'Magazzini senza stock collegati' as controllo,
    COUNT(*) as count
FROM warehouses w
LEFT JOIN stocks s ON w.id = s.warehouse_id
WHERE s.warehouse_id IS NULL;

-- 🎯 Magazzini più recenti (ultimi 30 giorni)
SELECT 
    name,
    address,
    created_at
FROM warehouses 
WHERE created_at >= DATEADD(day, -30, GETDATE())
ORDER BY created_at DESC;

-- 📊 Riepilogo generale magazzini
SELECT 
    'Totale magazzini' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM warehouses
UNION ALL
SELECT 
    'Con indirizzo' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM warehouses WHERE address IS NOT NULL AND address != ''
UNION ALL
SELECT 
    'Con stock' as metrica,
    CAST(COUNT(DISTINCT warehouse_id) AS VARCHAR(20)) as valore
FROM stocks
UNION ALL
SELECT 
    'Valore totale stoccaggio' as metrica,
    CAST(CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)) AS VARCHAR(20)) as valore
FROM stocks s
INNER JOIN products p ON s.product_id = p.id
UNION ALL
SELECT 
    'Prodotti totali stoccati' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM stocks;

-- 🔍 Ricerca magazzini per pattern nome
SELECT 
    name,
    address,
    created_at
FROM warehouses
WHERE name LIKE '%Centrale%' OR name LIKE '%Principale%'
ORDER BY created_at DESC;

-- 📈 Crescita magazzini nel tempo (ultimi 12 mesi)
SELECT 
    YEAR(created_at) as anno,
    MONTH(created_at) as mese,
    COUNT(*) as nuovi_magazzini,
    SUM(COUNT(*)) OVER (ORDER BY YEAR(created_at), MONTH(created_at)) as magazzini_cumulativi
FROM warehouses
WHERE created_at >= DATEADD(month, -12, GETDATE())
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY anno, mese;

-- 🏆 Top 5 magazzini per diversificazione prodotti
SELECT TOP 5
    w.name as nome_magazzino,
    COUNT(DISTINCT p.category) as categorie_diverse,
    COUNT(s.id) as prodotti_totali,
    SUM(s.quantity) as quantita_totale,
    CAST(SUM(s.quantity * p.price) AS DECIMAL(10,2)) as valore_totale
FROM warehouses w
INNER JOIN stocks s ON w.id = s.warehouse_id
INNER JOIN products p ON s.product_id = p.id
GROUP BY w.id, w.name
ORDER BY categorie_diverse DESC, valore_totale DESC;
