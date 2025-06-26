-- Inserimento utenti
INSERT INTO users (name, email, role, password, created_at, updated_at)
VALUES
  ('Admin User', 'admin@example.com', 'admin', 'hashed_admin_pw', GETDATE(), GETDATE()),
  ('Mario Rossi', 'mario@example.com', 'operatore', 'hashed_pw', GETDATE(), GETDATE()),
  ('Lucia Bianchi', 'lucia@example.com', 'operatore', 'hashed_pw', GETDATE(), GETDATE());

-- Inserimento clienti
INSERT INTO customers (name, email, phone, address, created_at, updated_at)
VALUES
  ('ACME S.p.A.', 'info@acme.com', '+390612345678', 'Via Roma 1, Milano', GETDATE(), GETDATE()),
  ('Globex Inc.', 'sales@globex.com', '+390612345679', 'Via Torino 42, Torino', GETDATE(), GETDATE());

-- Inserimento prodotti
INSERT INTO products (code, name, description, price, created_at, updated_at)
VALUES
  ('P001', 'Stampante Laser', 'Stampante professionale A4', 199.99, GETDATE(), GETDATE()),
  ('P002', 'Notebook 15"', 'Notebook leggero e potente', 899.00, GETDATE(), GETDATE()),
  ('P003', 'Mouse Wireless', 'Mouse ergonomico', 29.90, GETDATE(), GETDATE());

-- Inserimento magazzini
INSERT INTO warehouses (name, address, created_at, updated_at)
VALUES
  ('Magazzino Nord', 'Via Milano 10, Como', GETDATE(), GETDATE()),
  ('Magazzino Sud', 'Via Napoli 22, Bari', GETDATE(), GETDATE());

-- Inserimento stock
INSERT INTO stocks (product_id, warehouse_id, quantity, created_at, updated_at)
VALUES
  (1, 1, 50, GETDATE(), GETDATE()),
  (2, 1, 30, GETDATE(), GETDATE()),
  (1, 2, 15, GETDATE(), GETDATE()),
  (3, 2, 80, GETDATE(), GETDATE());

-- Inserimento ordini
INSERT INTO orders (customer_id, user_id, status, total, created_at, updated_at)
VALUES
  (1, 1, 'in lavorazione', 199.99, GETDATE(), GETDATE()),
  (2, 2, 'completato', 899.00, GETDATE(), GETDATE()),
  (1, 2, 'annullato', 29.90, GETDATE(), GETDATE()),
  (2, 1, 'in lavorazione', 199.99, GETDATE(), GETDATE());

-- Inserimento dettagli ordini
INSERT INTO order_details (order_id, product_id, quantity, price, created_at, updated_at)
VALUES
  (1, 1, 1, 199.99, GETDATE(), GETDATE()),
  (2, 2, 1, 899.00, GETDATE(), GETDATE()),
  (3, 3, 1, 29.90, GETDATE  (), GETDATE()),
  (4, 1, 1, 199.99, GETDATE(), GETDATE());

