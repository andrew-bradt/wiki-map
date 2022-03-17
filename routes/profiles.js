const express = require('express');
const router  = express.Router();

const segmentByFavoriteAndOwns = (maps, userId) => {
  const segmentedMaps = {ownFavorite: [], owns: [], favorites: []};
  for (const map of maps) {
    const {owner_id, map_id} = map;
    if (owner_id === userId && owner_id === map_id) {
      segmentedMaps.ownFavorite.push(map);
    } else if (owner_id === userId) {
      segmentedMaps.owns.push(map);
    } else {
      segmentedMaps.favorites.push(map);
    }
  }
  return segmentedMaps;
};

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const {id} = req.params;
    const queryParams = [id];
    const queryString = `
    SELECT DISTINCT maps.*, img_url FROM maps
    LEFT JOIN markers ON markers.map_id = maps.id
    JOIN
      (
        SELECT DISTINCT ON (map_id) markers.map_id, markers.id
        FROM markers
        WHERE img_url IS NOT NULL
      ) s ON s.id=markers.id
    LEFT OUTER JOIN favorites ON maps.id = favorites.map_id
    WHERE maps.owner_id = $1 OR favorites.user_id = $1;
    `;

    return db.query(queryString, queryParams)
      .then(data => {
        console.log(data.rows);
        res.json(segmentByFavoriteAndOwns(data.rows, Number(id)));
      })
      .catch(err => {
        res.status(500).json({msg: 'Server Error'});
        console.log(err.message);
      });
  });
  router.get("/", (req, res) => {
    const queryString = `
    SELECT id, name
    FROM users
    WHERE is_authenticated = TRUE
    `;
    return db.query(queryString)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500).json({msg: 'Server Error'});
        console.log(err.message);
      });
  });
  return router;
};
