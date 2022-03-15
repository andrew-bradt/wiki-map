const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res)=>{
    const {id} = req.params;
    const queryParams = [id];
    const queryString = `SELECT * FROM markers WHERE map_id = $1`;
    return db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500);
        res.json({'msg': `${err.message}`});
      });
  });
  router.post('/', (req, res) => {
    const {owner_id, title, description} = req.body;
    const queryParams = [owner_id, title, description];
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
  return router;
};
