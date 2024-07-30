require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const { User } = require('../models/userModel');

// @desc      Signup
// @route     POST /signup
// @access    Public
exports.signup = asyncHandler(async (req, res, next) => {
    try {
		 const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ data: user, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({message: error.errors[0].message });
    }
});

// @desc      Login
// @route     POST /login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ApiError('Please provide email and password', 400));
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    // Exclude password from response
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    res.status(200).json({ data: userWithoutPassword, token });
});

