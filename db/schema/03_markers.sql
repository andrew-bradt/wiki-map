-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  img_url TEXT,
  icon_img_url TEXT,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL
);
