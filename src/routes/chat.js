const router = require('express').Router();
const {
  getChatByUserId,
  postChat,
  deleteChatById,
} = require('../controller/chat');

router.get('/:id', getChatByUserId);
router.post('/', postChat);
router.delete('/:id', deleteChatById);

module.exports = router;
