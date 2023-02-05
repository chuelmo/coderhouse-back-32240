import dotenv from "dotenv";

import { default as CartManagerFS } from "./fs/CartManager-fs.js";
import { default as CartManagerDummy } from "./dummy/CartManager-dummy.js";
import { default as CartManagerMongo } from "./mongo/CartManager-mongo.js";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

let CartManager;
switch (DB_TYPE) {
  case "DUMMY":
    CartManager = CartManagerDummy;
    break;
  case "FS":
    CartManager = CartManagerFS;
    break;
  case "MONGO":
    CartManager = CartManagerMongo;
    break;
  default:
    CartManager = CartManagerDummy;
    break;
}

export default CartManager;
