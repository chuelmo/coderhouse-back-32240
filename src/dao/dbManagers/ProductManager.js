import dotenv from "dotenv";

import { default as ProductManagerFS } from "./fs/ProductManager-fs.js";
import { default as ProductManagerDummy } from "./dummy/ProductManager-dummy.js";
import { default as ProductManagerMongo } from "./mongo/ProductManager-mongo.js";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

let ProductManager;
switch (DB_TYPE) {
  case "DUMMY":
    ProductManager = ProductManagerDummy;
    break;
  case "FS":
    ProductManager = ProductManagerFS;
    break;
  case "MONGO":
    ProductManager = ProductManagerMongo;
    break;
  default:
    ProductManager = ProductManagerDummy;
    break;
}

export default ProductManager;
