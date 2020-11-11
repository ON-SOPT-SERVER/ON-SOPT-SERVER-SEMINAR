const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const {postService , userService, likeService} = require('../service');

const createPost = async (req, res) => {
  const { title, contents, UserId } = req.body;
  try {
    if(!title || !contents || !UserId ) {
      console.log('필요한값이 없습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    const isValidUser = await userService.isValidUser(UserId);

    if(!isValidUser) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const post = await postService.create(title, contents, UserId);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, post));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  }
}

const getPostAll = async (req, res) => {
  try{
    const posts = await postService.getPostAll();
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_ALL_SUCCESS, posts));
  } catch (err) {
    console.error(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  }
}

const createLike = async (req, res) => {
  const { UserId } = req.body;
  const postId = Number.parseInt(req.params.postId);
  try {
    const user = await userService.isValidUser(UserId); //존재하는 사용자인지 체크!

    if(!user) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const post = await postService.readOne(postId); // 존재하는 게시글인지 체크!

    if(!post) {
      console.log('존재하지 않는 게시글 입니다..');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
    }

    const alreadyLiked = await likeService.readOne(UserId, postId); // 좋야요를 이미 했는지 체크!
    if(alreadyLiked) {
      console.log('이미 좋아요를 한 게시글 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_LIKED));
    }

    const like = await post.addLiker(UserId); // 좋아요 추가해주기!
    return res.status(statusCode.OK).send(util.fail(statusCode.OK, responseMessage.CREATE_LIKE_SUCCESS,like));
  } catch (err) {
    console.log(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_LIKE_FAIL));
  }
}

module.exports = {
  createPost,
  getPostAll,
  createLike,
}