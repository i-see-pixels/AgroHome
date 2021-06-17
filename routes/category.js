const express = require("express");
const router = express.Router();

const {
    create,
    categoryById,
    read,
    update,
    categoriesList,
    deleteCategory,
} = require("../controllers/category");
const { isSignedin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", isSignedin, isAuth, isAdmin, create);
router.delete(
    "/category/:categoryId/:userId",
    isSignedin,
    isAuth,
    isAdmin,
    deleteCategory
);
router.put(
    "/category/:categoryId/:userId",
    isSignedin,
    isAuth,
    isAdmin,
    update
);
router.get("/category/:categoryId", read);
router.get("/categories", categoriesList);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
