const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const category = require("../models/category");

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }

        return res.json(data);
    });
};

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(404).json({
                error: "Category not found",
            });
        }

        req.category = category;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.deleteCategory = (req, res) => {
    category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({ error: errorHandler(err) });
        }

        res.json({
            message: "Category deleted",
        });
    });
};

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }

        return res.json(data);
    });
};

exports.categoriesList = (req, res) => {
    Category.find()
        .select("name")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }

            res.json(data);
        });
};
