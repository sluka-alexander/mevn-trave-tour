module.exports = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['auth-token'];
    if(bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
    }