const userDetailFetch = require("../Controllers/userDetailsController")
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router()

router.get('/',ensureAuthenticated, userDetailFetch);

module.exports = router;