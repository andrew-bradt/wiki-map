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
  return router;
};
