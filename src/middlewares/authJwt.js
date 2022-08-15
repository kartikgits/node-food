const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;