const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryString = `SELECT * FROM markers WHERE map_id = $1`;
    return db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500);
        res.json({ 'msg': `${err.message}` });
      });
  });
  router.post('/', (req, res) => {
    const {title, description, map_id} = req.body;
    const { user_id } = req.session;
    let queryParams, queryString;

    // if no map id, means we are inserting new map
    if (map_id === 'null') {
      queryParams = [user_id, title, description];
      queryString = `
        INSERT INTO maps (owner_id, title, description)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
    } else { // update when there is a map id
      queryParams = [map_id, title, description];
      queryString = `
      UPDATE maps
      SET title=$2,
      description=$3
      WHERE id=$1
      RETURNING id;
      `;
    }
    return db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(err => {
        res.status(500);
        res.json({'msg': `${err.message}`});
      });
  });

  router.get('/', (req, res) => {
    const { seeFavorites, searchTitle, map_id } = req.query;
    const { user_id } = req.session;
    const queryVal = [];
    let queryString = `
    select maps.*, img_url from maps
    left join markers on markers.map_id = maps.id
    join (
      SELECT DISTINCT ON (map_id) markers.map_id, markers.id FROM markers
      ) s
      ON s.id=markers.id
    `;

    // if user is searching all maps by title, no need to add clauses for user_id and favorites
    if (searchTitle) {
      queryVal.push('%' + searchTitle + '%');
      queryString += `
      WHERE maps.title ILIKE $1
      `;
    } else if (seeFavorites) { // if not searching, check if user want to see favorites, that require user_id
      queryVal.push(user_id);
      queryString += `
      JOIN favorites ON maps.id = favorites.map_id
      JOIN users ON users.id = favorites.user_id
      WHERE users.id=$1
      `;
    } else if (map_id) {
      queryVal.push(map_id);
      queryString += `
      WHERE maps.id=$1;
      `;
    }

    db.query(queryString, queryVal)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  });


  return router;
};
