const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/:map_id', (req, res) => {
    const user_id = req.session.user_id;
    const { map_id } = req.params;

    const queryStr = `
    SELECT * FROM favorites
    WHERE user_id=$1
    AND map_id=$2
    `;

    db.query(queryStr, [user_id, map_id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        res.status(500).json({ 'msg': `${err.message}` });
      });

  });

  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const { map_id } = req.body;

    const queryStr = `
    INSERT INTO favorites
    (user_id, map_id)
    VALUES
    ($1, $2);
    `;

    db.query(queryStr, [user_id, map_id])
      .then(() => {
        res.send('set favorite success');
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ 'msg': 'Server Error' });
      });

  });

  router.delete("/", (req, res) => {
    const user_id = req.session.user_id;
    const { map_id } = req.body;

    const queryStr = `
    DELETE FROM favorites
    WHERE user_id=$1
    AND map_id=$2
    `;

    db.query(queryStr, [user_id, map_id])
      .then(() => {
        res.send('favorite deleted');
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ 'msg': 'Server Error' });
      });

  });
  return router;
};
