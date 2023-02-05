import productsModel from "../../models/products.js";

export default class ProductManager {
  constructor(path) {
    console.log(
      `Working with mongoose, the path ${path} it is only for compatibility`
    );
  }

  async getProducts() {
    try {
      let prods = await productsModel.find({});
      this.products = prods.map((p) => p.toObject());
      return this.products;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductsWithLimit(limit) {
    try {
      let prods = await productsModel.find({}).limit(limit);
      this.products = prods.map((p) => p.toObject());
      return this.products;
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
      await this.getProducts();
      const newProduct = this.checkFields(product);
      if (newProduct) {
        if (this.products.some((el) => el.code === newProduct.code)) {
          throw new Error(
            `A product with the code ${newProduct.code} alredy exists`
          );
        }
        newProduct.thumbnails.push("./images/no-image.png");
        this.products.push(newProduct);
        let resultado = await productsModel.create(newProduct);
        return newProduct;
      } else {
        throw new Error("All fields are required");
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((el) => el.id == id);
    if (product) {
      return product;
    }
    return null;
  }

  async updateProduct(id, newProduct) {
    try {
      await this.getProducts();
      const product = this.products.find((el) => el.id == id);
      if (product) {
        product.title = newProduct?.title || product.title;
        product.description = newProduct?.description || product.description;
        product.price = newProduct?.price || product.price;
        product.thumbnails = newProduct?.thumbnails || product.thumbnails;
        product.stock = newProduct?.stock || product.stock;
        product.status = newProduct?.status || product.status;
        product.category = newProduct?.category || product.category;
        const filter = { id: id };
        const update = {
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnails: product.thumbnails,
          stock: product.stock,
          status: product.status,
          category: product.category,
        };
        await productsModel.findOneAndUpdate(filter, update, {
          returnOriginal: false,
        });
        return product;
      } else {
        throw new Error(`The product with id ${id} does not exist`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct(id) {
    try {
      await productsModel.deleteOne({ id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
}
