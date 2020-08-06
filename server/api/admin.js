const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

router.get('/primary', (req, res, next) => {
  res.json({
    title: 'Primary action',
    message: 'This is the primary action of the admin section',
    visibility: 'ADMIN'
  })
})

router.get('/secondary', (req, res, next) => {
  res.json({
    title: 'Secondary action',
    message: 'This is the secondary action of the admin section',
    visibility: 'ADMIN'
  })
})

module.exports = router;
