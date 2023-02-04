let products = [
  {
    id: 1,
    title: "Armario dummy",
    description: "Armario de pared",
    code: "cc34",
    price: "2234",
    status: true,
    stock: 3,
    category: "Muebles",
    thumbnails: ["./images/armario.webp"],
  },
  {
    id: 2,
    title: "Cocina dummy",
    description: "Cocina 4 hornallas",
    code: "cv43",
    price: 223,
    status: true,
    stock: 2,
    category: "Linea blanca",
    thumbnails: ["./images/cocina.jpg"],
  },
];

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  delay(t, v) {
    return new Promise((resolve) => setTimeout(resolve, t, v));
  }

  async getProducts() {
    await this.delay(100);
    return products;
  }

  async getProductsWithLimit(limit) {
    await this.delay(100);
    if (limit >= products.length) {
      return products;
    } else {
      return products.slice(0, limit);
    }
  }

  async getMaxId() {
    await this.delay(100);
    const ids = products.map((el) => el.id);
    if (ids.length === 0) {
      return 0;
    }
    return Math.max(...ids);
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
    await this.delay(100);
    const newProduct = this.checkFields(product);
    if (newProduct) {
      let id = await this.getMaxId();
      if (products.some((el) => el.code === newProduct.code)) {
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
      products.push(product);
      return product;
    } else {
      throw new Error("All fields are required");
    }
  }

  async getProductById(id) {
    await this.delay(100);
    const product = products.find((el) => el.id === id);
    if (product) {
      return product;
    }
    return null;
  }

  async updateProduct(id, newProduct) {
    await this.delay(100);
    const product = products.find((el) => el.id === id);
    if (product) {
      product.title = newProduct?.title || product.title;
      product.description = newProduct?.description || product.description;
      product.price = newProduct?.price || product.price;
      product.thumbnails = newProduct?.thumbnails || product.thumbnails;
      product.stock = newProduct?.stock || product.stock;
      product.status = newProduct?.status || product.status;
      product.category = newProduct?.category || product.category;
      const productos = products.map((el) => (el.id === id ? product : el));
      products = productos;
      return product;
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }

  async deleteProduct(id) {
    await this.delay(100);
    const product = products.find((el) => el.id === id);
    if (product) {
      const productos = products.filter((el) => el.id !== id);
      products = productos;
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }
}
