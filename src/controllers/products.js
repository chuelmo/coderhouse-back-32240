import ProductManager from "../dao/dbManagers/ProductManager.js";

const getAll = async (req, res) => {
  try {
    const pm = new ProductManager();
    let productos = [];
    productos = await pm.getProducts();
    res.status(200).send({ success: true, products: productos });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, error: "Products could not be retrieved" });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  try {
    const pm = new ProductManager();
    const producto = await pm.getProductById(id);
    if (producto) {
      res.status(200).send({ success: true, product: producto });
    } else {
      res.status(200).send({ success: false, error: "Product not found" });
    }
  } catch (e) {
    res
      .status(500)
      .send({ success: false, error: "Product could not be retrieved" });
  }
};

const add = async (req, res) => {
  const product = req.body.product;
  if (product) {
    try {
      const pm = new ProductManager();
      const createdProduct = await pm.addProduct(product);
      res.status(200).send({ success: true, product: createdProduct });
    } catch (e) {
      res.status(500).send({ success: false, error: e.message });
    }
  } else {
    res
      .status(400)
      .send({ success: false, error: "Bad request, expected a product" });
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  const product = req.body.product;
  if (product) {
    try {
      const pm = new ProductManager();
      const updatedProduct = await pm.updateProduct(id, product);
      res.status(200).send({ success: true, product: updatedProduct });
    } catch (e) {
      res.status(500).send({ success: false, error: e.message });
    }
  } else {
    res
      .status(400)
      .send({ success: false, error: "Bad request, expected a product" });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const pm = new ProductManager(Utils.PATH_PRODUCTS);
    await pm.deleteProduct(id);
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

export { getAll, getById, add, update, deleteProduct };
