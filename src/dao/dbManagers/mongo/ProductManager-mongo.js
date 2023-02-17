import productsModel from "../../models/products.js";

export default class ProductManager {
  constructor() {
    console.log(`Working with mongoose, class ProductManager`);
  }

  async getProducts(query, limit, page, sort) {
    try {
      let prods = await productsModel.paginate(query, {
        limit,
        page,
        sort,
        lean: true,
      });
      return prods;
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
        newProduct.thumbnails.push("./images/no-image.png");
        let resultado = await productsModel.create(newProduct);
        return resultado;
      } else {
        throw new Error("All fields are required");
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    const product = await productsModel.findById(id);
    if (product) {
      return product;
    }
    return null;
  }

  async updateProduct(id, newProduct) {
    try {
      const product = await this.getProductById(id);
      if (product) {
        product.title = newProduct?.title || product.title;
        product.description = newProduct?.description || product.description;
        product.price = newProduct?.price || product.price;
        product.thumbnails = newProduct?.thumbnails || product.thumbnails;
        product.stock = newProduct?.stock || product.stock;
        product.status = newProduct?.status || product.status;
        product.category = newProduct?.category || product.category;
        const update = {
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnails: product.thumbnails,
          stock: product.stock,
          status: product.status,
          category: product.category,
        };
        const updatedProduct = await productsModel.findOneAndUpdate(
          id,
          update,
          {
            returnOriginal: false,
          }
        );
        return updatedProduct;
      } else {
        throw new Error(`The product with id ${id} does not exist`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProduct(id) {
    try {
      await productsModel.deleteOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
}
