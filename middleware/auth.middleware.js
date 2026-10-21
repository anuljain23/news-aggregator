const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('../utils/response');

// Middleware to check if the user is authorized
const isAuthorized = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if the token is present
    if (!token) {
        return res.status(401).json(
            ErrorResponse('No token provided')
        );
    }

    // Verify the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }
    // Handle invalid token
    catch (e) {
        return res.status(401).json(
            ErrorResponse('Invalid Token')
        );
    }
    // Attach the decoded token to the request object for further use
    req.decodedToken = decodedToken;
    // Call the next middleware or route handler
    next();
}

module.exports = { isAuthorized }