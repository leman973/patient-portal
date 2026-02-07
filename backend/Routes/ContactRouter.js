const { submitContactForm } = require('../Controllers/contactUsController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();
router.post('/',ensureAuthenticated,submitContactForm)
module.exports = router;