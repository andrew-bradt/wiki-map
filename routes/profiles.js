const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const {id} = req.params;
    const queryParams = [id];
    const queryString = `
    SELECT maps.*
    FROM maps
    LEFT OUTER JOIN favorites ON maps.id = favorites.map_id
    WHERE maps.owner_id = $1 OR favorites.user_id = $1;
    `;
    return db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
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
