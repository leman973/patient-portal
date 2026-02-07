const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/mutler")
const {
    getUserDetail,
    updateProfile
} = require("../Controllers/profileController");

const router = require('express').Router();

router.get('/', ensureAuthenticated, getUserDetail);

router.put('/', ensureAuthenticated, upload.single('avatar'), updateProfile)

module.exports = router;