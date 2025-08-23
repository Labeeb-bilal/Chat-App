const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    console.log(userId)
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
 
const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload; // { userId, iat, exp }
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken
};