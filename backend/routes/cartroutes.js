import express from "express";
// import { authUser } from "../middleware/authUser.js";
import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cart.controllers.js";
const router = express.Router();
router.post("/update", authUser, updateCart);

export default router;
