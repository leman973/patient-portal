const getUserDetail = require('../Controllers/bookingController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,getUserDetail);

module.exports = router;