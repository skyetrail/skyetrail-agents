-- 20260904_subscriptions_cleanup.sql
-- Cleans up the subscriptions schema ahead of the billing rework.
BEGIN;

-- 1. Subscriptions need a plan state. Backfill the old rows first.
ALTER TABLE subscriptions ADD COLUMN plan_state text;
UPDATE subscriptions SET plan_state = 'legacy' WHERE plan_state IS NULL;
ALTER TABLE subscriptions ALTER COLUMN plan_state SET NOT NULL;

-- 2. Monthly price was stored as a float. Move it to numeric.
ALTER TABLE subscriptions ALTER COLUMN monthly_price TYPE numeric(12,2);

-- 3. Reporting filters by account.
CREATE INDEX idx_subscriptions_account_id ON subscriptions (account_id);

-- 4. Rename for clarity.
ALTER TABLE accounts RENAME COLUMN contact TO billing_email;

-- 5. Enforce the relation.
ALTER TABLE subscriptions ADD CONSTRAINT fk_subscriptions_account
  FOREIGN KEY (account_id) REFERENCES accounts (id);

-- 6. Free-text notes for cancellations.
ALTER TABLE subscriptions ADD COLUMN cancellation_notes text;

-- 7. The legacy events table is no longer read.
DROP TABLE subscription_events_legacy;

COMMIT;
