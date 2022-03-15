const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log(req.query);
    const querystring = 'SELECT * FROM maps JOIN users ON owner_id=users.id';
    db.query(querystring)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  });


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
