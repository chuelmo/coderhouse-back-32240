import fs from "fs";
import ProductManager from "./ProductManager-fs.js";
import * as Utils from "../../../utils/utils.js";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.exists = false;
  }

  // verifica que el archivo donde hacemos la persistencia exista
  async checkExists() {
    let exists = true;
    try {
      await fs.promises.access(this.path, fs.constants.F_OK);
    } catch (e) {
      exists = false;
    }
    this.exists = exists;
    return exists;
  }

  // Este método además de devolver un array con todos los carritos,
  // verifica que el archivo exista y si no existe lo crea
  // además es llamado por TODOS los otros métodos, la idea es
  // siempre cargar todos los carts en un array antes de trabajar
  // con ellos. Es la misma lógica que la clase ProductManager
  async getCarts() {
    try {
      if (this.exists === false) {
        let exists = await this.checkExists();
        if (exists === false) {
          await fs.promises.writeFile(this.path, "[]");
          this.exists = true;
        }
      }
      let carts = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(carts);
      return this.carts;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create() {
    try {
      let id = await this.getMaxId();
      id++;
      this.carts.push({ id: id, products: [] });
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
      return id;
    } catch (e) {
      throw new Error(e);
    }
  }

  // este método además de devolver el mayor id deja cargado
  // el array de carts con todos los carts que hay
  async getMaxId() {
    try {
      await this.getCarts();
      const ids = this.carts.map((el) => el.id);
      if (ids.length === 0) {
        return 0;
      }
      return Math.max(...ids);
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
          let carts = this.carts.filter((c) => c.id !== cid);
          carts.push(cart);
          await fs.promises.writeFile(this.path, JSON.stringify(carts));
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
