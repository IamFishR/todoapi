const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();
const requestCounts = new Map();
const logme = require('../helper/logme');
const dbOperation = require('../models/dbOperation');

const authMiddleware = (req, res, next) => {
    // Check for token in both cookies and authorization header
    let token = req.cookies.token || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '');
    }

    if (!token) {
        logme.warn({
            message: 'someone tried to access a protected route without a token.',
            data: {
                headers: req.headers,
                cookies: req.cookies
            }
        })
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
                logme.warn({
                    message: 'someone tried to access a protected route with an expired token.',
                    data: {
                        headers: req.headers,
                        error: err
                    }
                });
                message = 'Token expired.'
            }
            return res.status(401).send({ message: message });
        }

        req.user = decoded;
        dbOperation.logSession({
            session_id: decoded.session_id,
            endpoint: req.baseUrl,
            // method: req.method,
            // user_id: decoded.user_id
        }).then((result) => {
            if (result.error) {
                if (result.error === 'Session not found') {
                    return res.status(401).send({ message: 'Session not found' });
                }
                if (result.error === 'Session not active') {
                    return res.status(401).send({ message: 'Session expired' });
                }
                logme.error({
                    message: 'Error logging session',
                    data: {
                        error: result.error
                    }
                });
            }

            next();
        }).catch((error) => {
            return res.status(401).send("Not authorized");
        });
    });
};

const generateToken = async (user) => {
    /**
     * @param {object} user
     * @param {string} user.id
     * @param {string} user.email
     */
    return jsonWebToken.sign({
        user_id: user.user_id,
        email: user.email,
        session_id: user.session_id
    }, process.env.JSONWEBTOKEN_SECRET_KEY, { expiresIn: '2h' });
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
    decoded.user_id = decoded.user_id;
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