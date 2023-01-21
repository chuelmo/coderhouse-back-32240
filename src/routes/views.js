import express from "express";
import * as Utils from "../utils/utils.js";
import ProductManager from "../services/ProductManager.js";

const router = express.Router();
const pm = new ProductManager(Utils.PATH_PRODUCTS);
let productos = [];

const getProducts = async (req, res) => {
   try {
      productos = await pm.getProducts();
   } catch (e) {
      productos = [];
   }
   let hayProductos = productos.length > 0 ? true : false;
   res.render('listar', {title: 'Listado de Productos', hayProductos, productos});
}

router.get('/', getProducts);

router.get('/realtimeproducts', getProducts);

router.get('/acercade', (req, res) => {
   res.render('acercade', {title: 'Desafío Websockets'});
});

export default router;