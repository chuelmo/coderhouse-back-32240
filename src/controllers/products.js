import ProductManager from "../services/ProductManager.js";

const getAll = async (req, res) => {
  let allProducts = false;
  let limit = req.query.limit;
  limit = Number(limit);
  if (isNaN(limit)) {
    allProducts = true;
  } else {
    limit = Math.floor(limit);
    if (limit < 1) {
      allProducts = true;
    }
  }
  try {
    const pm = new ProductManager("./src/database/products.json");
    let productos = [];
    if (allProducts) {
      productos = await pm.getProducts();
    } else {
      productos = await pm.getProductsWithLimit(limit);
    }
    res.send({ products: productos });
  } catch (e) {
    res.send({ error: "Products could not be retrieved" });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  id = Number(id);
  if (isNaN(id)) {
    res.status(400).send({ error: "id must be a number" });
  } else {
    try {
      const pm = new ProductManager("./src/database/products.json");
      id = Math.floor(id);
      const producto = await pm.getProductById(id);
      if (producto) {
        res.send({ product: producto });
      } else {
        res.send({ error: "Product not found" });
      }
    } catch (e) {
      res.send({ error: "Product could not be retrieved" });
    }
  }
};

export { getAll, getById };
