const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/:lat/:lng', (req, res) => {
    const { lat, lng } = req.params;
    const query = `SELECT * FROM markers WHERE lat=$1 AND lng=$2`;

    db.query(query, [lat, lng])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  });

  router.delete('/', (req, res) => {
    const markerId = req.body.id;
    const query = `
    DELETE FROM markers
    WHERE id=$1
    `;

    db.query(query, [markerId])
      .then(result => {
        console.log(`Marker id: ${markerId} delete successful`);
        res.send();
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      });
  });

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
        res.send();
      }
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const { lat, lng, map_id } = req.body;
    console.log(lat, lng, map_id);
    const queryString = `
    INSERT INTO markers (map_id, lat, lng)
    VALUES ($1, $2, $3);`
      ;
    const queryParams = [map_id, lat, lng];

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
