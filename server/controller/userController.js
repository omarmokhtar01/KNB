const asyncHandler = require('express-async-handler');

// Handler for public route
exports.getPublic = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "This is a public route" });
});

// Handler for protected route user
exports.getProtected = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "This is a protected route" });
});

// Handler for admin route
exports.getAdmin = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "This is an admin route" });
});

// Handler for subAdmin route
exports.getSubAdmin = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "This is a subAdmin route" });
});
