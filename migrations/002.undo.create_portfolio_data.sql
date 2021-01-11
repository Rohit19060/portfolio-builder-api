ALTER TABLE portfolio_data
  DROP COLUMN IF EXISTS user_id;
DROP TABLE IF EXISTS portfolio_data CASCADE;