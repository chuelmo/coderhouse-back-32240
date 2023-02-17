import dotenv from "dotenv";
import ProductManager from "../dao/dbManagers/ProductManager.js";

dotenv.config();
const BASE_URL_API = process.env.BASE_URL_API;

const sanitizarParams = (params) => {
  let query, limit, page, sort;
  try {
    if (params?.query) {
      query = JSON.parse(params.query);
    } else {
      query = {};
    }
  } catch (e) {
    console.log("No se pudo parsear la query");
    query = {};
  }
  if (params?.limit) {
    if (isNaN(params.limit)) {
      limit = 10;
    } else {
      limit = params.limit;
    }
  } else {
    limit = 10;
  }
  if (params?.page) {
    if (isNaN(params.page)) {
      page = 1;
    } else {
      page = params.page;
    }
  } else {
    page = 1;
  }
  if (params?.sort) {
    if (params.sort === "asc" || params.sort === "desc") {
      sort = { price: params.sort };
    } else {
      sort = {};
    }
  } else {
    sort = {};
  }
  return { query, limit, page, sort };
};

const getAll = async (req, res) => {
  const { query, limit, page, sort } = sanitizarParams(req.query);
  try {
    const pm = new ProductManager();
    const respuesta = await pm.getProducts(query, limit, page, sort);
    let prevLink = null;
    let nextLink = null;
    if (respuesta.hasPrevPage) {
      prevLink = `${BASE_URL_API}/api/products?${
        "query=" + JSON.stringify(query)
      }&${"limit=" + limit}&${"page=" + (page - 1)}&${"sort=" + sort?.price}`;
      prevLink = prevLink.replace(/\"/g, `'`);
    }
    if (respuesta.hasNextPage) {
      nextLink = `${BASE_URL_API}/api/products?${
        "query=" + JSON.stringify(query)
      }&${"limit=" + limit}&${"page=" + (page + 1)}&${
        "sort=" + JSON.stringify(sort)
      }`;
      nextLink = nextLink.replace(/\"/g, `'`);
    }
    const answer = {
      success: true,
      payload: respuesta.docs,
      totalPages: respuesta.totalPages,
      totalDocs: respuesta.totalDocs,
      prevPage: respuesta.prevPage,
      nextPage: respuesta.nextPage,
      page: respuesta.page,
      hasPrevPage: respuesta.hasPrevPage,
      hasNextPage: respuesta.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    };
    res.status(200).send(answer);
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
    const pm = new ProductManager();
    await pm.deleteProduct(id);
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

export { getAll, getById, add, update, deleteProduct };
