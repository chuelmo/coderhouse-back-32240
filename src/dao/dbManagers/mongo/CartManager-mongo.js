import ProductManager from "../ProductManager.js";
import cartsModel from "./../../models/carts.js";
import * as Utils from "../../../utils/utils.js";

export default class CartManager {
  constructor(path) {
    console.log(
      `Working with mongoose, collection carts, the path ${path} it is only for compatibility`
    );
    this.carts = [];
  }

  async getCarts() {
    try {
      let carts = await cartsModel.find({});
      this.carts = carts.map((c) => c.toObject());
      return this.carts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create() {
    try {
      let resultado = await cartsModel.create({});
      this.carts.push(resultado.toObject());
      return resultado.id;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProducts(id) {
    try {
      await this.getCarts();
      const cart = this.carts.filter((c) => c.id === id);
      if (cart.length > 0) {
        return cart[0].products;
      }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct(cid, pid) {
    try {
      const pm = new ProductManager(Utils.PATH_PRODUCTS);
      const producto = await pm.getProductById(pid);
      if (producto) {
        await this.getCarts();
        let cart = this.carts.filter((c) => c.id === cid);
        if (cart.length > 0) {
          //cart exists
          cart = cart[0];
          cart = this.addProductToCart(cart, pid);
          const filter = { id: cart.id };
          const update = { products: cart.products };
          await cartsModel.findOneAndUpdate(filter, update, {
            returnOriginal: false,
          });
        } else {
          throw new Error(`The cart with id ${cid} does not exists`);
        }
      } else {
        throw new Error(`The product with id ${pid} does not exists`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  addProductToCart(cart, pid) {
    let quantity = 1;
    let products = cart.products;
    let product = products.filter((p) => p.id === pid);
    if (product.length > 0) {
      quantity = product[0].quantity + 1;
    }
    products = products.filter((p) => p.id !== pid);
    products.push({ id: pid, quantity: quantity });
    return { id: cart.id, products: products };
  }
}
