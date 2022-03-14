-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
