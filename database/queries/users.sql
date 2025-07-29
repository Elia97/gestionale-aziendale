-- ========================================
-- STATISTICHE E ANALISI DEGLI UTENTI
-- ========================================

-- 👥 Conteggio totale utenti
SELECT COUNT(*) as total_users FROM users;

-- 📊 Distribuzione per ruolo
SELECT 
    role,
    COUNT(*) as count_per_role,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) AS DECIMAL(5,2)) as percentage
FROM users 
GROUP BY role 
ORDER BY count_per_role DESC;

-- 🏢 Distribuzione per dipartimento
SELECT 
    ISNULL(department, 'Non specificato') as department,
    COUNT(*) as count_per_department,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) AS DECIMAL(5,2)) as percentage
FROM users 
GROUP BY department 
ORDER BY count_per_department DESC;

-- 📧 Statistiche email verificate
SELECT 
    CASE 
        WHEN email_verified_at IS NULL THEN 'Non verificata'
        ELSE 'Verificata'
    END as stato_verifica,
    COUNT(*) as count_users,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) AS DECIMAL(5,2)) as percentage
FROM users
GROUP BY 
    CASE 
        WHEN email_verified_at IS NULL THEN 'Non verificata'
        ELSE 'Verificata'
    END
ORDER BY count_users DESC;

-- 📱 Utenti con telefono specificato
SELECT 
    CASE 
        WHEN phone IS NULL OR phone = '' THEN 'Senza telefono'
        ELSE 'Con telefono'
    END as stato_telefono,
    COUNT(*) as count_users,
    CAST(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) AS DECIMAL(5,2)) as percentage
FROM users
GROUP BY 
    CASE 
        WHEN phone IS NULL OR phone = '' THEN 'Senza telefono'
        ELSE 'Con telefono'
    END
ORDER BY count_users DESC;

-- 👤 Lista utenti amministratori
SELECT 
    firstName,
    lastName,
    email,
    department,
    created_at as data_registrazione
FROM users 
WHERE role = 'admin'
ORDER BY created_at DESC;

-- 👥 Lista utenti operatori
SELECT 
    firstName,
    lastName,
    email,
    department,
    phone,
    created_at as data_registrazione
FROM users 
WHERE role = 'operator'
ORDER BY created_at DESC;

-- 📅 Utenti registrati per mese
SELECT 
    YEAR(created_at) as anno,
    MONTH(created_at) as mese,
    COUNT(*) as nuovi_utenti
FROM users
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY anno DESC, mese DESC;

-- 🔍 Utenti con nomi più lunghi
SELECT 
    firstName,
    lastName,
    CONCAT(firstName, ' ', ISNULL(lastName, '')) as nome_completo,
    LEN(firstName) + LEN(ISNULL(lastName, '')) as lunghezza_nome_totale
FROM users 
ORDER BY lunghezza_nome_totale DESC;

-- 📝 Verifica domini email più comuni
SELECT 
    RIGHT(email, LEN(email) - CHARINDEX('@', email)) as dominio_email,
    COUNT(*) as num_utenti
FROM users
GROUP BY RIGHT(email, LEN(email) - CHARINDEX('@', email))
ORDER BY num_utenti DESC;

-- ✅ Verifica integrità dati utenti
SELECT 
    'Utenti senza nome' as controllo,
    COUNT(*) as count
FROM users 
WHERE firstName IS NULL OR firstName = ''
UNION ALL
SELECT 
    'Utenti senza email' as controllo,
    COUNT(*) as count
FROM users 
WHERE email IS NULL OR email = ''
UNION ALL
SELECT 
    'Email duplicate' as controllo,
    COUNT(*) - COUNT(DISTINCT email) as count
FROM users
UNION ALL
SELECT 
    'Utenti senza ruolo' as controllo,
    COUNT(*) as count
FROM users 
WHERE role IS NULL OR role = '';

-- 🎯 Utenti più recenti (ultimi 30 giorni)
SELECT 
    firstName,
    lastName,
    email,
    role,
    department,
    created_at
FROM users 
WHERE created_at >= DATEADD(day, -30, GETDATE())
ORDER BY created_at DESC;

-- 📊 Riepilogo generale utenti
SELECT 
    'Totale utenti' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM users
UNION ALL
SELECT 
    'Amministratori' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM users WHERE role = 'admin'
UNION ALL
SELECT 
    'Operatori' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM users WHERE role = 'operator'
UNION ALL
SELECT 
    'Email verificate' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM users WHERE email_verified_at IS NOT NULL
UNION ALL
SELECT 
    'Con telefono' as metrica,
    CAST(COUNT(*) AS VARCHAR(20)) as valore
FROM users WHERE phone IS NOT NULL AND phone != '';