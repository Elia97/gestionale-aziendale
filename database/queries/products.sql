-- ========================================
-- STATISTICHE E ANALISI DEI PRODOTTI
-- ========================================

-- 📊 Conteggio totale prodotti
SELECT COUNT(*) as total_products FROM products;

-- 📈 Distribuzione per categoria
SELECT 
    category,
    COUNT(*) as count_per_category,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM products) AS DECIMAL(5,2)) as percentage
FROM products 
GROUP BY category 
ORDER BY count_per_category DESC;

-- 💰 Statistiche prezzi
SELECT 
    MIN(price) as prezzo_minimo,
    MAX(price) as prezzo_massimo,
    AVG(price) as prezzo_medio,
    CAST(AVG(price) AS DECIMAL(10,2)) as prezzo_medio_rounded
FROM products;

-- 💰 Analisi prezzi per categoria
SELECT 
    category,
    COUNT(*) as num_prodotti,
    MIN(price) as prezzo_min,
    MAX(price) as prezzo_max,
    CAST(AVG(price) AS DECIMAL(10,2)) as prezzo_medio,
    CAST(SUM(price) AS DECIMAL(10,2)) as valore_totale_categoria
FROM products 
GROUP BY category 
ORDER BY prezzo_medio DESC;

-- 🏷️ Top 10 prodotti più costosi
SELECT TOP 10
    code,
    name,
    category,
    price
FROM products 
ORDER BY price DESC;

-- 🏷️ Top 10 prodotti più economici
SELECT TOP 10
    code,
    name,
    category,
    price
FROM products 
ORDER BY price ASC;

-- 📊 Range di prezzo per fasce
SELECT 
    CASE 
        WHEN price < 50 THEN 'Economico (< €50)'
        WHEN price BETWEEN 50 AND 150 THEN 'Medio (€50-150)'
        WHEN price BETWEEN 150 AND 500 THEN 'Alto (€150-500)'
        ELSE 'Premium (> €500)'
    END as fascia_prezzo,
    COUNT(*) as num_prodotti,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM products) AS DECIMAL(5,2)) as percentuale
FROM products
GROUP BY 
    CASE 
        WHEN price < 50 THEN 'Economico (< €50)'
        WHEN price BETWEEN 50 AND 150 THEN 'Medio (€50-150)'
        WHEN price BETWEEN 150 AND 500 THEN 'Alto (€150-500)'
        ELSE 'Premium (> €500)'
    END
ORDER BY 
    CASE 
        WHEN 
            CASE 
                WHEN price < 50 THEN 'Economico (< €50)'
                WHEN price BETWEEN 50 AND 150 THEN 'Medio (€50-150)'
                WHEN price BETWEEN 150 AND 500 THEN 'Alto (€150-500)'
                ELSE 'Premium (> €500)'
            END = 'Economico (< €50)' THEN 1
        WHEN 
            CASE 
                WHEN price < 50 THEN 'Economico (< €50)'
                WHEN price BETWEEN 50 AND 150 THEN 'Medio (€50-150)'
                WHEN price BETWEEN 150 AND 500 THEN 'Alto (€150-500)'
                ELSE 'Premium (> €500)'
            END = 'Medio (€50-150)' THEN 2
        WHEN 
            CASE 
                WHEN price < 50 THEN 'Economico (< €50)'
                WHEN price BETWEEN 50 AND 150 THEN 'Medio (€50-150)'
                WHEN price BETWEEN 150 AND 500 THEN 'Alto (€150-500)'
                ELSE 'Premium (> €500)'
            END = 'Alto (€150-500)' THEN 3
        ELSE 4
    END;

-- 🔍 Prodotti con descrizioni più lunghe
SELECT 
    code,
    name,
    category,
    LEN(description) as lunghezza_descrizione
FROM products 
WHERE description IS NOT NULL
ORDER BY LEN(description) DESC;

-- 📝 Verifica codici prodotto per pattern
SELECT 
    LEFT(code, 3) as prefisso_categoria,
    COUNT(*) as num_prodotti
FROM products
GROUP BY LEFT(code, 3)
ORDER BY prefisso_categoria;

-- ✅ Verifica integrità dati
SELECT 
    'Prodotti senza nome' as controllo,
    COUNT(*) as count
FROM products 
WHERE name IS NULL OR name = ''
UNION ALL
SELECT 
    'Prodotti senza codice' as controllo,
    COUNT(*) as count
FROM products 
WHERE code IS NULL OR code = ''
UNION ALL
SELECT 
    'Prodotti con prezzo negativo' as controllo,
    COUNT(*) as count
FROM products 
WHERE price < 0
UNION ALL
SELECT 
    'Prodotti con prezzo zero' as controllo,
    COUNT(*) as count
FROM products 
WHERE price = 0;