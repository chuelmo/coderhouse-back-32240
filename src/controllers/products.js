import ProductManager from "../services/ProductManager.js";
import * as Utils from "../utils/utils.js";

const getAll = async (req, res) => {
    let allProducts = false;
    let limit = req.query.limit;
    limit = Number(limit);
    if (isNaN(limit)) {
        allProducts = true;
    } else {
        limit = Math.floor(limit);
        if (limit < 1) {
            allProducts = true;
        }
    }
    try {
        const pm = new ProductManager(Utils.PATH_PRODUCTS);
        let productos = [];
        if (allProducts) {
            productos = await pm.getProducts();
        } else {
            productos = await pm.getProductsWithLimit(limit);
        }
        res.send({ success: true, products: productos });
    } catch (e) {
        res.send({ success: false, error: "Products could not be retrieved" });
    }
};

const getById = async (req, res) => {
    let id = req.params.id;
    id = Number(id);
    if (isNaN(id)) {
        res.status(400).send({ success: false, error: "id must be a number" });
    } else {
        try {
            const pm = new ProductManager(Utils.PATH_PRODUCTS);
            id = Math.floor(id);
            const producto = await pm.getProductById(id);
            if (producto) {
                res.send({ success: true, product: producto });
            } else {
                res.send({ success: false, error: "Product not found" });
            }
        } catch (e) {
            res.send({ success: false, error: "Product could not be retrieved" });
        }
    }
};

const add = async (req, res) => {
    const product = req.body.product;
    if (product) {
        try {
            const pm = new ProductManager(Utils.PATH_PRODUCTS);
            const createdProduct = await pm.addProduct(product);
            res.send({ success: true, product: createdProduct });
        } catch (e) {
            res.send({ success: false, error: e.message });
        }
    } else {
        res.status(400).send({ success: false, error: "Bad request, expected a product" });
    }
}

const update = async (req, res) => {
    let id = req.params.id;
    id = Number(id);
    if (isNaN(id)) {
        res.status(400).send({ success: false, error: "id must be a number" });
    } else {
        const product = req.body.product;
        if (product) {
            try {
                const pm = new ProductManager(Utils.PATH_PRODUCTS);
                const updatedProduct = await pm.updateProduct(id, product);
                res.send({ success: true, product: updatedProduct });
            } catch (e) {
                res.send({ success: false, error: e.message });
            }
        } else {
            res.status(400).send({ success: false, error: "Bad request, expected a product" });
        }
    }
}

const deleteProduct = async (req, res) => {
    let id = req.params.id;
    id = Number(id);
    if (isNaN(id)) {
        res.status(400).send({ success: false, error: "id must be a number" });
    } else {
        try {
            const pm = new ProductManager(Utils.PATH_PRODUCTS);
            await pm.deleteProduct(id);
            res.send({ success: true});
        } catch (e) {
            res.send({ success: false, error: e.message });
        }
    }
}

export { getAll, getById, add, update, deleteProduct };