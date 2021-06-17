const { check, validationResult } = require("express-validator");
const User = require("../models/user");

exports.validationChecks = [
    check("name", "Name is required").notEmpty(),
    check("email", "Invalid Email address")
        .isEmail()
        .isLength({ min: 4, max: 32 })
        .withMessage("Email should be 4 to 32 long")
        .custom(async (email) => {
            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
                throw new Error("Email already in use");
            }
        }),
    check("mobile_no")
        .isLength(10)
        .withMessage("Mobile Number must be 10 digits"),
    check("password", "Password required")
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("Password must be atleast 4 long"),
];

exports.validationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    next();
};
