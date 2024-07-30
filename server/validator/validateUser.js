// validators/user.js
const { z } = require('zod');

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional().default('user').refine(value => ['user', 'admin','subAdmin'].includes(value), {
        message: 'Invalid role',
    }),
});

const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(422).json({ errors: error.errors.map(err => err.message) });
    }
};

module.exports = validateUser;
