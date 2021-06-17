const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .select("-hashed_password -salt")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found",
                });
            }

            req.profile = user;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.profile);
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({ error: "User not found" });
            }

            const {
                _id,
                name,
                email,
                access_level,
                mobile_no,
                item_history,
            } = user;
            res.json({
                user: {
                    _id,
                    access_level,
                    name,
                    email,
                    mobile_no,
                    item_history,
                },
            });
        }
    );
};
