-- Active: 1751819236960@@127.0.0.1@1433@gestionale-aziendale
-- Seeder per la tabella users
INSERT INTO dbo.users 
    (firstName, lastName, email, password, role, department, created_at, updated_at) 
VALUES
    ('Admin', 'User', 'admin@example.com', 'password123', 'admin', 'IT', GETDATE(), GETDATE()),
    ('Luca', 'Bianchi', 'luca.bianchi@example.com', 'password123', 'operator', 'Marketing', GETDATE(), GETDATE()),
    ('Sara', 'Verdi', 'sara.verdi@example.com', 'password123', 'operator', 'Sales', GETDATE(), GETDATE()),
    ('Marco', 'Neri', 'marco.neri@example.com', 'password123', 'operator', 'Finance', GETDATE(), GETDATE()),
    ('Elena', 'Russo', 'elena.russo@example.com', 'password123', 'operator', 'HR', GETDATE(), GETDATE()),
    ('Davide', 'Moretti', 'davide.moretti@example.com', 'password123', 'operator', 'Customer Service', GETDATE(), GETDATE()),
    ('Giulia', 'Ferrari', 'giulia.ferrari@example.com', 'password123', 'operator', 'Development', GETDATE(), GETDATE()),
    ('Matteo', 'Romano', 'matteo.romano@example.com', 'password123', 'operator', 'Logistics', GETDATE(), GETDATE()),
    ('Alice', 'Costa', 'alice.costa@example.com', 'password123', 'operator', 'Support', GETDATE(), GETDATE()),
    ('Federico', 'Greco', 'federico.greco@example.com', 'password123', 'operator', 'Quality Assurance', GETDATE(), GETDATE());
