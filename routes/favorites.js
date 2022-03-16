const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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
        res.status(500).json({ 'msg': `${err.message}`});
      });

  });
  return router;
};
