const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
    return res.json(req.product);
};

exports.delete = (req, res) => {
    product = req.product;
    product.remove((err, deletedProd) => {
        if (err) {
            return res.status(400).json({ error: errorHandler(err) });
        }

        res.json({
            message: "Product deleted",
        });
    });
};

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(404).json({
                    error: "Product not found",
                });
            }

            req.product = product;
            next();
        });
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }

        const { name, description, stockQty, price, category } = fields;

        if (!name || !description || !stockQty || !price || !category) {
            return res.status(400).json({
                error: "All fields required",
            });
        }

        let product = new Product(fields);

        if (files.image) {
            if (files.image.size > 30000000) {
                return res.status(400).json({
                    error: "Image size should be less than 30 MB",
                });
            }

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save((err, prodResult) => {
            if (err) {
                return res.status(400).json({ error: errorHandler(err) });
            }

            res.json(prodResult);
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }

        const { name, description, stockQty, price, category } = fields;

        if (!name || !description || !stockQty || !price || !category) {
            return res.status(400).json({
                error: "All fields required",
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.image) {
            if (files.image.size > 30000000) {
                return res.status(400).json({
                    error: "Image size should be less than 30 MB",
                });
            }

            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }

        product.save((err, prodResult) => {
            if (err) {
                return res.status(400).json({ error: errorHandler(err) });
            }

            res.json(prodResult);
        });
    });
};

exports.productsList = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-image")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, prods) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }

            res.json(prods);
        });
};

exports.relatedProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .populate("category", "name")
        .limit(limit)
        .exec((err, prods) => {
            if (err) {
                return res.status(400).json({
                    error: "No related products found",
                });
            }

            res.json(prods);
        });
};

exports.listOfCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found",
            });
        }

        res.json(categories);
    });
};

exports.prodSearchList = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-image")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found",
                });
            }
            res.json({
                size: data.length,
                data,
            });
        });
};

exports.showImage = (req, res, next) => {
    const img = req.product.image;

    if (img.data) {
        res.set("Content-Type", img.contentType);
        return res.send(img.data);
    }

    next();
};
