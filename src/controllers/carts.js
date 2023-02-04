import CartManager from "../dao/dbManagers/CartManager.js";
import * as Utils from "../utils/utils.js";

const create = async (req, res) => {
  try {
    const cm = new CartManager(Utils.PATH_CARTS);
    const id = await cm.create();
    res.status(200).send({ success: true, cart: { id: id, products: [] } });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

const getProducts = async (req, res) => {
  let id = req.params.id;
  id = Number(id);
  if (isNaN(id)) {
    res.status(400).send({ success: false, error: "id must be a number" });
  } else {
    try {
      const cm = new CartManager(Utils.PATH_CARTS);
      const products = await cm.getProducts(id);
      if (Array.isArray(products)) {
        res.status(200).send({ success: true, products: products });
      } else {
        res.status(200).send({ success: false, error: "Cart not found" });
      }
    } catch (e) {
      res.status(500).send({ success: false, error: e.message });
    }
  }
};

const addProduct = async (req, res) => {
  let cid = req.params.cid;
  cid = Number(cid);
  if (isNaN(cid)) {
    res.status(400).send({ success: false, error: "cid must be a number" });
    return;
  }
  let pid = req.params.pid;
  pid = Number(pid);
  if (isNaN(pid)) {
    res.status(400).send({ success: false, error: "pid must be a number" });
    return;
  }
  try {
    const cm = new CartManager(Utils.PATH_CARTS);
    await cm.addProduct(cid, pid);
    res
      .status(200)
      .send({ success: true, message: `Product ${pid} added to cart ${cid}` });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

export { create, getProducts, addProduct };
