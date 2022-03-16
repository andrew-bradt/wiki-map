-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) DEFAULT ' ',
  description TEXT DEFAULT '',
  img_url TEXT DEFAULT '',
  icon_img_url TEXT DEFAULT '',
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL
);
