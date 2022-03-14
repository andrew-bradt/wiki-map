const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res)=>{
    const {id} = req.params;
  });
  return router;
};
