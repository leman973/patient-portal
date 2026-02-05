const jwt = require("jsonwebtoken")

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: "Unathorized jwt token is required" });
    }
    try {
        console.log("AUTH HEADER:", req.headers.authorization);
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("TOKEN RECEIVED IN MIDDLEWARE:", token);
        req.user = decoded;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403)
            .json({ message: "Unathorized jwt token is wrong or expired" });
    }
}

module.exports = ensureAuthenticated;