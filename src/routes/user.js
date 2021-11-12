const router = require('express').Router();
const uploadImage = require('../middleware/multer');
const {
  registerUser,
  updateUser,
  getUserById,
  getAllUser,
  deleteUser,
} = require('../controller/user');

router.post('/', uploadImage, registerUser);
router.patch('/update/:userId', uploadImage, updateUser);
router.get('/:userId', getUserById);
router.get('/', getAllUser);
router.delete('/:userId', deleteUser);

module.exports = router;
