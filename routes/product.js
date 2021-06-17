const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read: readProduct,
    delete: deleteProd,
    update,
    productsList,
    relatedProducts,
    prodSearchList,
    showImage,
} = require("../controllers/product");
const { isSignedin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", isSignedin, isAuth, isAdmin, create);
router.post("/products/search", prodSearchList);

router.delete(
    "/product/:productId/:userId",
    isSignedin,
    isAuth,
    isAdmin,
    deleteProd
);

router.put("/product/:productId/:userId", isSignedin, isAuth, isAdmin, update);

router.get("/product/:productId", readProduct);
router.get("/products", productsList);
router.get("/products/related/:productId", relatedProducts);
router.get("/product/image/:productId", showImage);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
