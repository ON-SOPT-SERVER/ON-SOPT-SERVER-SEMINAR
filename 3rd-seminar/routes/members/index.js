const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let membersDB = require('../../modules/members');

router.post('/', (req, res) => {
  const { name, part, age } = req.body;

  if (!name || !part || !age) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  const idx = membersDB[membersDB.length - 1].idx + 1;
  membersDB.push({
    idx,
    name,
    part,
    age
  })
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_CREATE_SUCCESS, membersDB));
});

router.get('/', (req, res) => {
  const members = membersDB;
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, members));
});

router.get('/:idx', (req, res) => {
  const { idx } = req.params;
  const member = membersDB.find(member => member.idx == idx);

  if (member === undefined) {
    console.log('idx가 유효하지 않습니다.');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, member));
})

router.delete('/:idx', (req, res) => {
  const { idx } = req.params;
  const member = membersDB.filter(member => member.idx == idx);

  if (member.length === 0) {
    console.log('idx가 유효하지 않습니다.');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  membersDB = membersDB.filter(member => member.idx != idx);
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS, membersDB));
});

router.put('/:idx', (req, res) => {
  const { idx } = req.params;
  const { name, part, age } = req.body;
  const memberIdx = membersDB.findIndex(member => member.idx == idx);

  if(memberIdx === -1) {
    console.log('idx가 유효하지 않습니다.');
    return  res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  if (!name || !part || !age) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  membersDB[memberIdx] = {
    idx,
    name,
    part,
    age
  }
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, membersDB));
});

module.exports = router;