const express = require("express");
const router = express.Router();
const { userById, read, update } = require("../controllers/user");
const { isSignedin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", isSignedin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile,
    });
});
router.get("/user/:userId", isSignedin, isAuth, read);
router.put("/user/:userId", isSignedin, isAuth, update);

router.param("userId", userById);

module.exports = router;
