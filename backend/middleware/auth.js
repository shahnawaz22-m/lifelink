const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "No token, access denied" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};