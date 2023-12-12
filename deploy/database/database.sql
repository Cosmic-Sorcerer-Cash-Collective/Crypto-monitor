CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_id varchar(255) NOT NULL,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS wallets (
  id SERIAL PRIMARY KEY,
  user_id varchar(255) NOT NULL,
  balance decimal(10,2) NOT NULL,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  UNIQUE (user_id)
);