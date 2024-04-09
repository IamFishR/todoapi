const e = require('express');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();
const requestCounts = new Map();

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '');
    }

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
            let message = err.message;
            if (err.name === 'TokenExpiredError') {
                message = 'Token expired.'
            }
            return res.status(401).send({ message: message });
        }

        req.user = decoded;
        next();
    });
};

const generateToken = async (user) => {
    /**
     * @param {object} user
     * @param {string} user.id
     * @param {string} user.email
     */
    return jsonWebToken.sign({
        id: user.id,
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