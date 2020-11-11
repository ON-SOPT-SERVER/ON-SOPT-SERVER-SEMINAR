const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPostAll);
router.post('/:postId/like', postController.createLike);

module.exports = router;
