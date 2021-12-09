const jwt = require('../../utils/jwt');

// Verify Token Function
const verifyToken = async (req, res, next) => {
    // Get Auth Header Value
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken !== 'undefined') {
        const token = bearerToken.split(' ')[1];
        req.token = token;
        try {
            const validate = await jwt.verifyToken(req.token);
            next();
        } catch(err) {
            res.status(403).send('Auth expired');
        }
    } else {
        // Forbidden (403)
        res.sendStatus(403);
    }
}

module.exports = verifyToken;