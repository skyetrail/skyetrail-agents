-- 20260904_invoices_cleanup.sql
-- Cleans up the invoices schema ahead of the AP automation work.
BEGIN;

-- 1. Invoices need a payment state. Backfill the old rows first.
ALTER TABLE invoices ADD COLUMN payment_state text;
UPDATE invoices SET payment_state = 'legacy' WHERE payment_state IS NULL;
ALTER TABLE invoices ALTER COLUMN payment_state SET NOT NULL;

-- 2. Amount due was stored as a float. Move it to numeric.
ALTER TABLE invoices ALTER COLUMN amount_due TYPE numeric(12,2);

-- 3. Reporting filters by vendor.
CREATE INDEX idx_invoices_vendor_id ON invoices (vendor_id);

-- 4. Rename for clarity.
ALTER TABLE vendors RENAME COLUMN contact TO billing_contact;

-- 5. Enforce the relation.
ALTER TABLE invoices ADD CONSTRAINT fk_invoices_vendor
  FOREIGN KEY (vendor_id) REFERENCES vendors (id);

-- 6. Free-text notes for AP.
ALTER TABLE invoices ADD COLUMN ap_notes text;

-- 7. The legacy dispute table is no longer read.
DROP TABLE invoice_disputes_legacy;

COMMIT;
