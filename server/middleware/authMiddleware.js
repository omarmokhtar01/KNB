const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// @desc     Make sure that user is logged in
// @route    GET /api/v1/auth/protected
// @access   Private
exports.auth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError('You are not logged in. Please login to get access', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decoded.id); // Use `findByPk` instead of `findById`

    if (!currentUser) {
        return next(new ApiError('The user that belong to this token does no longer exist', 401));
    }

    // Add more checks here if needed, such as password change

    req.user = currentUser;
    next();
});

// Authorization check if the certain user is allowed to access the specific route or not allowed
// even if logged in because not all logged in users can access all routes
exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError('You are not allowed to perform this action', 403));
    }
    next();
});
