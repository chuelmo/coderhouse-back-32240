import ProductManager from "./ProductManager-dummy.js";

export default class CartManager {
  constructor() {
    this.carts = [];
  }

  delay(t, v) {
    return new Promise((resolve) => setTimeout(resolve, t, v));
  }

  async getCarts() {
    await this.delay(100);
    return this.carts;
  }

  async create() {
    let id = await this.getMaxId();
    id++;
    this.carts.push({ id: id, products: [] });
    return id;
  }

  async getMaxId() {
    await this.delay(100);
    const ids = this.carts.map((el) => el.id);
    if (ids.length === 0) {
      return 0;
    }
    return Math.max(...ids);
  }

  async getProducts(id) {
    await this.delay(100);
    const cart = this.carts.filter((c) => c.id === id);
    if (cart.length > 0) {
      return cart[0].products;
    }
    return null;
  }

  async addProduct(cid, pid) {
    const pm = new ProductManager("no-path");
    const producto = await pm.getProductById(pid);
    if (producto) {
      let cart = this.carts.filter((c) => c.id === cid);
      if (cart.length > 0) {
        //cart exists
        cart = cart[0];
        cart = this.addProductToCart(cart, pid);
        let carts = this.carts.filter((c) => c.id !== cid);
        carts.push(cart);
      } else {
        throw new Error(`The cart with id ${cid} does not exists`);
      }
    } else {
      throw new Error(`The product with id ${pid} does not exists`);
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
