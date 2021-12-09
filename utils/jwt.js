const jwt = require('jsonwebtoken');

const createToken = (userId, expires) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: expires
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    verifyToken
}