const router = require('express').Router();
const getData = require('./routes/getData');

router.use('/', getData);

module.exports = router;
