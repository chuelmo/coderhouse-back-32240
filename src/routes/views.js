import express from "express";
import * as Utils from "../utils/utils.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
import MessageManager from "../dao/dbManagers/MessageManager.js";

const router = express.Router();
const pm = new ProductManager(Utils.PATH_PRODUCTS);
const mm = new MessageManager(Utils.PATH_MESSAGES);
let productos = [];
let mensajes = [];

const getProducts = async (req, res) => {
  try {
    productos = await pm.getProducts();
  } catch (e) {
    productos = [];
  }
  let hayProductos = productos.length > 0 ? true : false;
  res.render("listar", {
    title: "Listado de Productos",
    hayProductos,
    productos,
  });
};

const getChats = async (req, res) => {
  try {
    mensajes = await mm.getMessages();
  } catch (e) {
    mensajes = [];
  }
  let hayMensajes = mensajes.length > 0 ? true : false;
  res.render("mensajes", {
    title: "Canal de Chat",
    hayMensajes,
    mensajes,
  });
};

router.get("/", getProducts);

router.get("/chat", getChats);

router.get("/acercade", (req, res) => {
  res.render("acercade", { title: "Práctica de integración" });
});

export default router;
