import express from "express";
import * as Controller from "../controllers/messages.js";

const router = express.Router();

router.post("/", Controller.add);
router.get("/", Controller.getAll);

export default router;
