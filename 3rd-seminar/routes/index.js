const express = require('express');          
const router = express.Router();              

router.use('/ranking', require('./ranking'));
router.use('/society', require('./society'));
router.use('/members', require('./members'));
router.use('/users', require('./users'));
module.exports = router;