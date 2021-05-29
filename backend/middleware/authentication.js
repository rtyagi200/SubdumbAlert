const jwt = require('jsonwebtoken');

exports.checkUserAccess = (req, res, next) => {
    try {
        var token = req.cookies.token;
        var decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decode;
        console.log('user data :'+req.userData);
        next();
    } catch (err) {
        console.log("authentication failed");
        return res.status(401).json({
            success: false,
            message: "authentication failed"
        })
    }
}