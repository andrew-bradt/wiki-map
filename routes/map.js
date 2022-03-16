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
    const {title, description} = req.body;
    const { user_id } = req.session;
    const queryParams = [user_id, title, description];
    const queryString = `
      INSERT INTO maps (owner_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
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
    const { user_id, seeFavorites, searchTitle } = req.query;
    const queryVal = [];
    let queryString = `
    select maps.*, img_url from maps
    join markers on markers.map_id = maps.id
    join (
      SELECT DISTINCT ON (map_id) markers.map_id, markers.id FROM markers
      ) s
      ON s.id=markers.id
    `;

    // if user is searching all maps by title, no need to add clauses for user_id and favorites
    if (searchTitle) {
      queryVal.push('%' + searchTitle + '%');
      queryString += `
      WHERE maps.title LIKE $1
      `;
    } else if (seeFavorites) { // if not searching, check if user want to see favorites, that require user_id
      queryVal.push(user_id);
      queryString += `
      JOIN favorites ON maps.id = favorites.map_id
      JOIN users ON users.id = favorites.user_id
      WHERE users.id=$1
      `;
    } else if (user_id) { // if only user_id is passed in, user want to see maps created by them
      queryVal.push(user_id);
      queryString += `
      JOIN users ON users.id=maps.owner_id
      WHERE users.id=$1
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
