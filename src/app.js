import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { default as productsRouter } from "./routes/products.js";
import { default as cartsRouter } from "./routes/carts.js";
import { default as messagesRouter } from "./routes/messages.js";
import { default as viewsRouter } from "./routes/views.js";
import * as Utils from "./utils/utils.js";
import ProductManager from "./dao/dbManagers/ProductManager.js";
import MessageManager from "./dao/dbManagers/MessageManager.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_TYPE = process.env.DB_TYPE;
if (DB_TYPE === "MONGO") {
  const USER = process.env.USER;
  const PASSWORD = process.env.PASSWORD;
  const CLUSTER = process.env.CLUSTER;
  const DB_NAME = process.env.DATABASE_NAME;
  const DB_OPTIONS = process.env.DATABASE_OPTIONS;
  const strMongoConnection = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}${DB_NAME}${DB_OPTIONS}`;
  mongoose.set("strictQuery", false);
  mongoose.connect(strMongoConnection, () => {
    console.log("Connected to MongoDB");
  });
}

const app = express();

app.engine(
  ".hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "index.hbs" })
);
app.set("views", "./src/views");
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use(express.static("./public"));
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.on("new-product", async () => {
    const pm = new ProductManager(Utils.PATH_PRODUCTS);
    let productos = [];
    try {
      productos = await pm.getProducts();
    } catch (e) {
      productos = [];
    }
    socketServer.sockets.emit("all_productos", productos);
  });

  socket.on("new-message", async () => {
    const mm = new MessageManager(Utils.PATH_MESSAGES);
    let mensajes = [];
    try {
      mensajes = await mm.getMessages();
    } catch (e) {
      mensajes = [];
    }
    socketServer.sockets.emit("all_mensajes", mensajes);
  });
});
