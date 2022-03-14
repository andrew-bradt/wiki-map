const express = require('express');
const router  = express.Router();

const MAP_ID = 1;
const TEMP_TITLE = 'Pizza';

module.exports = (db) => {
  router.post('/', (req, res) => {
    const {lat, lng} = req.body;
    const queryString = `
    INSERT INTO markers (map_id, title, lat, lng)
    VALUES ($1, $2, $3, $4);`
    ;
    const queryParams = [MAP_ID, TEMP_TITLE, lat, lng];

    db.query(queryString, queryParams)
      .then(()=>{
        res.send();
      })
      .catch(err => {
        res
          .status(500)
          .json({error: err.message});
      });
  });
  return router;
};
