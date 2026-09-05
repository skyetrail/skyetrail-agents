-- 20260904_sessions_cleanup.sql
-- Cleans up the sessions schema ahead of the device-trust work.
BEGIN;

-- 1. Sessions need a state. Backfill the old rows first.
ALTER TABLE sessions ADD COLUMN session_state text;
UPDATE sessions SET session_state = 'legacy' WHERE session_state IS NULL;
ALTER TABLE sessions ALTER COLUMN session_state SET NOT NULL;

-- 2. Duration was stored as a float. Move it to numeric.
ALTER TABLE sessions ALTER COLUMN duration_seconds TYPE numeric(12,2);

-- 3. Reporting filters by device.
CREATE INDEX idx_sessions_device_id ON sessions (device_id);

-- 4. Rename for clarity.
ALTER TABLE devices RENAME COLUMN owner TO owner_email;

-- 5. Enforce the relation.
ALTER TABLE sessions ADD CONSTRAINT fk_sessions_device
  FOREIGN KEY (device_id) REFERENCES devices (id);

-- 6. Free-text notes for diagnostics.
ALTER TABLE sessions ADD COLUMN diagnostic_notes text;

-- 7. The legacy events table is no longer read.
DROP TABLE session_events_legacy;

COMMIT;
