import express from "express";
import * as Controller from "../controllers/pets.js"

const router = express.Router();

router.get("/", Controller.getAll)
router.post("/", Controller.add)

export default router;