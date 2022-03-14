const express = require('express');
const router  = express.Router();

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
  return router;
};
