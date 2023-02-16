import dotenv from "dotenv";
import { default as ProductManagerMongo } from "./mongo/ProductManager-mongo.js";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

let ProductManager;
switch (DB_TYPE) {
  case "DUMMY":
    ProductManager = ProductManagerMongo;
    break;
  case "FS":
    ProductManager = ProductManagerMongo;
    break;
  case "MONGO":
    ProductManager = ProductManagerMongo;
    break;
  default:
    ProductManager = ProductManagerMongo;
    break;
}

export default ProductManager;
