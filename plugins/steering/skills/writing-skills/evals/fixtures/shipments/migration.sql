-- 20260904_shipments_cleanup.sql
-- Cleans up the shipments schema ahead of the logistics reporting work.
BEGIN;

-- 1. Shipments need a state. Backfill the old rows first.
ALTER TABLE shipments ADD COLUMN state text;
UPDATE shipments SET state = 'legacy' WHERE state IS NULL;
ALTER TABLE shipments ALTER COLUMN state SET NOT NULL;

-- 2. Freight cost was stored as a float. Move it to numeric.
ALTER TABLE shipments ALTER COLUMN freight_cost TYPE numeric(12,2);

-- 3. Reporting filters by carrier.
CREATE INDEX idx_shipments_carrier_id ON shipments (carrier_id);

-- 4. Rename for clarity.
ALTER TABLE carriers RENAME COLUMN contact TO contact_email;

-- 5. Enforce the relation.
ALTER TABLE shipments ADD CONSTRAINT fk_shipments_carrier
  FOREIGN KEY (carrier_id) REFERENCES carriers (id);

-- 6. Free-text notes for dispatch.
ALTER TABLE shipments ADD COLUMN dispatch_notes text;

-- 7. The legacy tracking table is no longer read.
DROP TABLE shipment_tracking_legacy;

COMMIT;
