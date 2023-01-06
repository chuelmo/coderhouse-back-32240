import express from "express";
import * as Controller from "../controllers/products.js";

const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);

export default router;
