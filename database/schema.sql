-- Simple SQL schema for Intelligent Excuse Generator

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE excuses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  scenario VARCHAR(255),
  text TEXT,
  proof JSONB,
  ranking FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  excuse_id INTEGER REFERENCES excuses(id),
  used_at TIMESTAMP DEFAULT NOW(),
  medium VARCHAR(50)
);
