const router = require('express').Router();
// const uploadImage = require("../middleware/multer");
const { getData } = require('../controller/getData');

router.get('/test', getData);
// router.post("/", uploadImage, postEvent);

module.exports = router;
