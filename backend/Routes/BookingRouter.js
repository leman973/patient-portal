const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.json({ message: "Bookings data" });
});

module.exports = router;