const adminAcessOnly = (req, res, next) => {
    console.log(req.user.userRole);
    if (req.user.userRole !== "ADMIN") {
        return res.status(403).json({ message: "Admin Access Only" });
    }
    next();
}

module.exports = adminAcessOnly;