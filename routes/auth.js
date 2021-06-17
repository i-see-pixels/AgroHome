const express = require('express')
const router = express.Router()
const { signup, signin, signout} = require('../controllers/auth')
const { validationChecks, validationErrors } = require('../validator/index')

router.post('/signup', validationChecks, validationErrors, signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router;