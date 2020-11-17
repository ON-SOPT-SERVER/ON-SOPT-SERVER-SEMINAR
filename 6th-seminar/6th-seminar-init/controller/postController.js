const { User, Post, Like } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
  /**
   * body: title, contents, userId
   */
  createPost: async (req, res) => {
    const { title, contents, userId } = req.body;
    try {
      //const post = await Post.create({title, contents, UserId: userId });
      const user = await User.findOne({id: userId});
      const post = await Post.create({title, contents});
      await user.addPost(post);
      return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR)
      .send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
    }
  },
  readPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{
          model: User, // 작성자
          attributes: ['email', 'userName']
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Liker',
          attributes: { exclude: ['password', 'salt']}
        }]
      });
      return res.status(sc.OK).send(ut.success(sc.OK, "전체 게시글 조회 성공", posts));
    } catch (err) {
      console.log(err);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(ut.fail(sc.INTERNAL_SERVER_ERROR, "전체 게시글 조회 실패"));
    }
  },
  createLike: async (req, res) => {
    const PostId = Number.parseInt(req.params.postId);
    const UserId = req.body.userId;
    try {
      const like = await Like.create({ UserId, PostId });
      return res.status(sc.OK).send(ut.success(sc.OK, "좋아요 성공", like));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, "좋아요 실패"));
    }
  }
}