const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        hashed_password: {
            type: String,
            required: true,
        },

        salt: String,

        about: {
            type: String,
            trim: true,
        },

        access_level: {
            type: Number,
            default: 0,
        },

        mobile_no: {
            type: Number,
        },

        item_history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = bcrypt.genSaltSync(SALT_FACTOR);
        this.hashed_password = bcrypt.hashSync(password, this.salt);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (pass) {
        return bcrypt.compareSync(pass, this.hashed_password);
    },
};

module.exports = mongoose.model("User", userSchema);
