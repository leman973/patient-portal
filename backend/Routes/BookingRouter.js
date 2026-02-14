const {getUserDetail, addBooking} = require('../Controllers/bookingController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,getUserDetail);

router.post('/',ensureAuthenticated,addBooking);

module.exports = router;