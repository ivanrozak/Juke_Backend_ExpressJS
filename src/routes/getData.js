const router = require('express').Router();
// const uploadImage = require("../middleware/multer");
const { getData } = require('../controller/getData');

router.get('/', getData);
// router.get("/filter", getEventSearch);
// router.post("/", uploadImage, postEvent);

module.exports = router;
