import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
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

  // Este método además de devolver un array con todos los productos,
  // verifica que el archivo exista y si no existe lo crea
  // además es llamado por TODOS los otros métodos, la idea es
  // siempre cargar todos los productos en un array antes de trabajar
  // con ellos.
  async getProducts() {
    try {
      if (this.exists === false) {
        let exists = await this.checkExists();
        if (exists === false) {
          await fs.promises.writeFile(this.path, "[]");
          this.exists = true;
        }
      }
      let prods = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(prods);
      return this.products;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getProductsWithLimit(limit) {
    try {
      await this.getProducts();
      if (limit >= this.products.length) {
        return this.products;
      } else {
        return this.products.slice(0, limit);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  // este método además de devolver el mayor id deja cargado
  // el array de productos con todos los productos que hay
  async getMaxId() {
    try {
      await this.getProducts();
      const ids = this.products.map((el) => el.id);
      if (ids.length === 0) {
        return 0;
      }
      return Math.max(...ids);
    } catch (e) {
      throw new Error(e);
    }
  }

  checkFields(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = product;
    let realThumbnails = thumbnails;
    let ok = true;
    if (typeof title !== "string") ok = false;
    if (typeof description !== "string") ok = false;
    if (typeof code !== "string") ok = false;
    if (typeof price !== "number") ok = false;
    if (typeof status !== "boolean") ok = false;
    if (typeof stock !== "number") ok = false;
    if (typeof category !== "string") ok = false;
    if (!Array.isArray(thumbnails)) realThumbnails = [];
    if (ok) {
      let newProduct = { ...product, thumbnails: realThumbnails };
      return newProduct;
    } else {
      return null;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = this.checkFields(product);
      if (newProduct) {
        let id = await this.getMaxId();
        if (this.products.some((el) => el.code === newProduct.code)) {
          throw new Error(
            `A product with the code ${newProduct.code} alredy exists`
          );
        }
        newProduct.thumbnails.push("./images/no-image.png");
        const product = {
          id: id + 1,
          title: newProduct.title,
          description: newProduct.description,
          code: newProduct.code,
          price: newProduct.price,
          status: newProduct.status,
          stock: newProduct.stock,
          category: newProduct.category,
          thumbnails: newProduct.thumbnails,
        };
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return product;
      } else {
        throw new Error("All fields are required");
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      return product;
    }
    return null;
  }

  async updateProduct(id, newProduct) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      product.title = newProduct?.title || product.title;
      product.description = newProduct?.description || product.description;
      product.price = newProduct?.price || product.price;
      product.thumbnails = newProduct?.thumbnails || product.thumbnails;
      product.stock = newProduct?.stock || product.stock;
      product.status = newProduct?.status || product.status;
      product.category = newProduct?.category || product.category;
      const products = this.products.map((el) => (el.id === id ? product : el));
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }

  async deleteProduct(id) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      const products = this.products.filter((el) => el.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }
}
