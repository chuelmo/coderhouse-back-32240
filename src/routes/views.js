import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/acercade", (req, res) => {
  res.render("acercade");
});

router.get("/chat", (req, res) => {
  res.render("mensajes");
});

router.get("/products", (req, res) => {
  res.render("products");
});

export default router;
