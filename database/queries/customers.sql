-- ========================================
-- STATISTICHE E ANALISI DEI CLIENTI
-- ========================================

-- 👥 Conteggio totale clienti
SELECT COUNT(*) as total_customers FROM customers;

-- 📧 Clienti con informazioni complete
SELECT 
    CASE 
        WHEN phone IS NOT NULL AND phone != '' AND address IS NOT NULL AND address != '' THEN 'Completo'
        WHEN phone IS NOT NULL AND phone != '' THEN 'Solo telefono'
        WHEN address IS NOT NULL AND address != '' THEN 'Solo indirizzo'
        ELSE 'Solo email'
    END as completezza_dati,
    COUNT(*) as count_customers,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers) AS DECIMAL(5,2)) as percentage
FROM customers
GROUP BY 
    CASE 
        WHEN phone IS NOT NULL AND phone != '' AND address IS NOT NULL AND address != '' THEN 'Completo'
        WHEN phone IS NOT NULL AND phone != '' THEN 'Solo telefono'
        WHEN address IS NOT NULL AND address != '' THEN 'Solo indirizzo'
        ELSE 'Solo email'
    END
ORDER BY count_customers DESC;

-- 📱 Clienti con telefono specificato
SELECT 
    CASE 
        WHEN phone IS NULL OR phone = '' THEN 'Senza telefono'
        ELSE 'Con telefono'
    END as stato_telefono,
    COUNT(*) as count_customers,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers) AS DECIMAL(5,2)) as percentage
FROM customers
GROUP BY 
    CASE 
        WHEN phone IS NULL OR phone = '' THEN 'Senza telefono'
        ELSE 'Con telefono'
    END
ORDER BY count_customers DESC;

-- 🏠 Clienti con indirizzo specificato
SELECT 
    CASE 
        WHEN address IS NULL OR address = '' THEN 'Senza indirizzo'
        ELSE 'Con indirizzo'
    END as stato_indirizzo,
    COUNT(*) as count_customers,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers) AS DECIMAL(5,2)) as percentage
FROM customers
GROUP BY 
    CASE 
        WHEN address IS NULL OR address = '' THEN 'Senza indirizzo'
        ELSE 'Con indirizzo'
    END
ORDER BY count_customers DESC;

-- 📅 Clienti registrati per mese
SELECT 
    YEAR(created_at) as anno,
    MONTH(created_at) as mese,
    COUNT(*) as nuovi_clienti
FROM customers
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY anno DESC, mese DESC;

-- 🔍 Clienti con nomi più lunghi
SELECT 
    name,
    email,
    LEN(name) as lunghezza_nome
FROM customers 
ORDER BY lunghezza_nome DESC;

-- 📝 Verifica domini email più comuni
SELECT 
    RIGHT(email, LEN(email) - CHARINDEX('@', email)) as dominio_email,
    COUNT(*) as num_clienti
FROM customers
GROUP BY RIGHT(email, LEN(email) - CHARINDEX('@', email))
ORDER BY num_clienti DESC;

-- 🏙️ Analisi indirizzi per città (primi 3 caratteri)
SELECT 
    LEFT(address, 20) as inizio_indirizzo,
    COUNT(*) as num_clienti
FROM customers
WHERE address IS NOT NULL AND address != ''
GROUP BY LEFT(address, 20)
ORDER BY num_clienti DESC;

-- 📊 Clienti con ordini vs senza ordini
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id) THEN 'Con ordini'
        ELSE 'Senza ordini'
    END as stato_ordini,
    COUNT(*) as count_customers,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers) AS DECIMAL(5,2)) as percentage
FROM customers
GROUP BY 
    CASE 
        WHEN EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id) THEN 'Con ordini'
        ELSE 'Senza ordini'
    END
ORDER BY count_customers DESC;

-- 💰 Top 10 clienti per numero di ordini
SELECT TOP 10
    c.name,
    c.email,
    COUNT(o.id) as numero_ordini,
    ISNULL(SUM(o.total), 0) as totale_speso
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY numero_ordini DESC, totale_speso DESC;

-- 💎 Clienti VIP (con più di 5 ordini o totale speso > 1000)
SELECT 
    c.name,
    c.email,
    c.phone,
    COUNT(o.id) as numero_ordini,
    ISNULL(SUM(o.total), 0) as totale_speso
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email, c.phone
HAVING COUNT(o.id) > 5 OR ISNULL(SUM(o.total), 0) > 1000
ORDER BY totale_speso DESC, numero_ordini DESC;

-- ✅ Verifica integrità dati clienti
SELECT 
    'Clienti senza nome' as controllo,
    COUNT(*) as count
FROM customers 
WHERE name IS NULL OR name = ''
UNION ALL
SELECT 
    'Clienti senza email' as controllo,
    COUNT(*) as count
FROM customers 
WHERE email IS NULL OR email = ''
UNION ALL
SELECT 
    'Email duplicate' as controllo,
    COUNT(*) - COUNT(DISTINCT email) as count
FROM customers
UNION ALL
SELECT 
    'Clienti con telefono formato non valido' as controllo,
    COUNT(*) as count
FROM customers 
WHERE phone IS NOT NULL AND phone != '' AND LEN(phone) < 8;

-- 🎯 Clienti più recenti (ultimi 30 giorni)
SELECT 
    name,
    email,
    phone,
    address,
    created_at
FROM customers 
WHERE created_at >= DATEADD(day, -30, GETDATE())
ORDER BY created_at DESC;

-- 📊 Riepilogo generale clienti
SELECT 
    'Totale clienti' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM customers
UNION ALL
SELECT 
    'Con telefono' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM customers WHERE phone IS NOT NULL AND phone != ''
UNION ALL
SELECT 
    'Con indirizzo' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM customers WHERE address IS NOT NULL AND address != ''
UNION ALL
SELECT 
    'Con ordini' as metrica,
    CAST(COUNT(DISTINCT customer_id) AS VARCHAR(20)) as valore
FROM orders
UNION ALL
SELECT 
    'Dati completi' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM customers 
WHERE phone IS NOT NULL AND phone != '' AND address IS NOT NULL AND address != '';

-- 🔍 Ricerca clienti per pattern email
SELECT 
    name,
    email,
    phone,
    created_at
FROM customers
WHERE email LIKE '%gmail.com'
ORDER BY created_at DESC;

-- 📈 Crescita clienti nel tempo (ultimi 12 mesi)
SELECT 
    YEAR(created_at) as anno,
    MONTH(created_at) as mese,
    COUNT(*) as nuovi_clienti,
    SUM(COUNT(*)) OVER (ORDER BY YEAR(created_at), MONTH(created_at)) as clienti_cumulativi
FROM customers
WHERE created_at >= DATEADD(month, -12, GETDATE())
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY anno, mese;