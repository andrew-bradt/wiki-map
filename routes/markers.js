const express = require('express');
const router = express.Router();

const MAP_ID = 1;
const TEMP_TITLE = 'Pizza';

module.exports = (db) => {
  router.put("/", (req, res) => {
    const newInfo = req.body;

    const values = Object.values(newInfo);
    const query = `
    UPDATE markers
    SET
    title=$2,
    description=$3,
    img_url=$4,
    icon_img_url=$5
    WHERE id=$1;
    `;

    db.query(query, values)
      .then(result => {
        console.log(`Marker id: ${newInfo.id} update successful`);
      }
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const { lat, lng } = req.body;
    const queryString = `
    INSERT INTO markers (map_id, title, lat, lng)
    VALUES ($1, $2, $3, $4);`
      ;
    const queryParams = [MAP_ID, TEMP_TITLE, lat, lng];

    db.query(queryString, queryParams)
      .then(() => {
        res.send();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
