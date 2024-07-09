const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            // If the Authorization header is missing
            return res.json({message: "Authorization header is missing"});
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            // If the Authorization header is not in the correct format
            return res.json({message: "Authorization header is not in Bearer token format"});
        }

        const token = parts[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // If token verification fails
                return res.json({message: "Invalid or expired token"});
            }
            req.user = user;
            next();
        });
    } catch (error) {
        // Handle any other errors
        next(error);
    }
};

module.exports = authenticateToken;