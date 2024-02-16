const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();
const requestCounts = new Map();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            message: 'Houston, we have a problem! You\'re missing an access token, which is like trying to launch a spaceship without fuel.'
        });
    }

    if (req.baseUrl === '/askme') {
        const count = requestCounts.get(token) || 0;
        if (count > 55) {
            return res.status(429).json({ error: "Rate limit exceeded" });
        }
        requestCounts.set(token, count + 1);
        req.ratelimit = requestCounts.get(token);
    }

    jsonWebToken.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        req.user = decoded;
        next();
    });
};

const generateToken = (user) => {
    /**
     * @param {object} user
     * @param {string} user._id
     */
    return jsonWebToken.sign({
        id: user._id,
        email: user.email
    }, process.env.JSONWEBTOKEN_SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    /**
     * @param {string} token
     * @returns {object} decoded with user id and expiration date
     */
    const decoded = jsonWebToken.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
    decoded.exp = convertDate(decoded.exp);
    decoded.iat = convertDate(decoded.iat);
    decoded.email = decoded.email;
    return decoded;
};

const convertDate = (date) => {
    const milliseconds = new Date(date * 1000);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    return milliseconds.toLocaleDateString('en-US', options);
};

module.exports = {
    authMiddleware,
    generateToken,
    verifyToken
};