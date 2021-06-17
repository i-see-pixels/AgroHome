const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

const secKey = "dajkdhwoioaflknasncla";

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ error: errorHandler(err) });
        }
        return res.json({ user });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exist.",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(404).json({
                error: "Invalid credentials",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY || secKey);
        res.cookie("tk", token, { expire: new Date() + 9999 });

        const { _id, name, email, mobile_no, access_level } = user;

        return res.json({
            token,
            user: { _id, name, email, mobile_no, access_level },
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("tk");
    res.json({
        message: "Signed out successfully",
    });
};

exports.isSignedin = expressJWT({
    secret: process.env.JWT_TOKEN_KEY || secKey,
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        res.status(403).json({
            error: "Access Denied",
        });
    }

    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "Admin Resources! Access denied",
        });
    }

    next();
};
