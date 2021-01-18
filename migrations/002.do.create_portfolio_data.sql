CREATE TABLE portfolio_data (
  name TEXT NOT NULL,
  portfolio_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  projects text[] NOT NULL,
  organization text[] NOT NULL,
  github TEXT NOT NULL,
  linkedin TEXT NOT NULL
);


ALTER TABLE portfolio_data
  ADD COLUMN
    user_id INTEGER REFERENCES portfolio_users(id)
    ON DELETE SET NULL;