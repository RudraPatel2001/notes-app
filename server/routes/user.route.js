const express = require('express')
const router = express.Router();
const { handleUserPost, allUsers } = require('../controllers/user.controller')

router.post('/', handleUserPost);
router.get('/', allUsers);

module.exports = router;