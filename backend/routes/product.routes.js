import express, { Router } from "express";

import {
  addProduct,
  getProductById,
  getProducts,
  changeStock,
} from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";
import { authSeller } from "../middleware/authSeller.js";
const router = new Router();

router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);
export default router;
