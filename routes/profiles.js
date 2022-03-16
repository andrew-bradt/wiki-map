const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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
