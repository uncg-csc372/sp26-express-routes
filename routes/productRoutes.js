"use strict";
import { Router } from "express";
const router = Router();
import productController from '../controllers/productController.js';


router.get("/", ensureAuth, productController.fetchAllProducts);
router.get("/:id", ensureAuth, productController.fetchProductById);
router.get("/type/:type", ensureAuth, productController.fetchProductsByType);
router.post("/", ensureAuth, productController.createProduct);
router.delete("/:id", ensureAuth, productController.removeProduct);


function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // Only save the return URL for GET requests (navigating to pages)
  if (req.method === 'GET') {
    req.session.returnTo = req.originalUrl;
  }

  res.redirect('/auth/login');
}

export default router;