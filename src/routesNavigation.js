const router = require('express').Router();
const getData = require('./routes/getData');
const user = require('./routes/user');
const chat = require('./routes/chat');

router.use('/', getData);
router.use('/user', user);
router.use('/chat', chat);

module.exports = router;
