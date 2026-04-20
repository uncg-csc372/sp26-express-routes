"use strict";
const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/", ensureAuth, productController.fetchAllProducts);
router.get("/:id", ensureAuth, productController.fetchProductById);
router.get("/type/:type", ensureAuth, productController.fetchProductsByType);
router.post("/", ensureAuth, productController.createProduct);
router.delete("/:id", ensureAuth, productController.removeProduct);


function ensureAuth(req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  next();
}

module.exports = router;