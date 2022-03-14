const express = require('express');
const router  = express.Router();

const USER_ID = 1;
const TEMP_TITLE = 'Pizza';

module.exports = (db) => {
  router.post('/', (req, res) => {
    const {lat, lng} = req.body;
    const queryString = `
    INSERT INTO markers (map_id, title, lat, lng)
    VALUES ($1, $2, $3, $4);`
    ;
    const queryParams = [USER_ID, TEMP_TITLE, lat, lng];
    db.query(queryString, queryParams);
  });
  return router;
};
