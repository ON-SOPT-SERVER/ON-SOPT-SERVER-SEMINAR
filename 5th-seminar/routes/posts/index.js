const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.post('/', postController.createPost);
router.get('/', postController.readAllPosts);
router.post('/:postId/like', postController.createLike);

module.exports = router;
