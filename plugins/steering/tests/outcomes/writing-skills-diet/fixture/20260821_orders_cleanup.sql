-- 20260821_orders_cleanup.sql
-- Cleans up the orders schema ahead of the Q3 reporting work.
BEGIN;

-- 1. Orders need a status. Backfill the old rows first.
ALTER TABLE orders ADD COLUMN status text;
UPDATE orders SET status = 'legacy' WHERE status IS NULL;
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;

-- 2. Money was stored as a float. Move it to numeric.
ALTER TABLE orders ALTER COLUMN total TYPE numeric(12,2);

-- 3. Reporting filters by customer.
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

-- 4. Rename for clarity.
ALTER TABLE customers RENAME COLUMN email TO email_address;

-- 5. Enforce the relation.
ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
  FOREIGN KEY (customer_id) REFERENCES customers (id);

-- 6. Free-text notes for support.
ALTER TABLE orders ADD COLUMN notes text;

-- 7. The legacy audit table is no longer read.
DROP TABLE order_audit_legacy;

COMMIT;
