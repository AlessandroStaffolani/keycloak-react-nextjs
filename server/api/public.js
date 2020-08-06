const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

router.get('/primary', (req, res, next) => {
  res.json({
    title: 'Primary action',
    message: 'This is the primary action of the public section',
    visibility: 'PUBLIC'
  })
})

router.get('/secondary', (req, res, next) => {
  res.json({
    title: 'Secondary action',
    message: 'This is the secondary action of the public section',
    visibility: 'PUBLIC'
  })
})

module.exports = router;
