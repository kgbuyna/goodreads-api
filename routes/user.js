const express = require('express');
const {
    register , getUsers
} = require('../controllers/user')

const router = express.Router({ mergeParams: true});

router.route('/').post(register).get(getUsers);

module.exports = router; 