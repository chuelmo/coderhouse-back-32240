import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { default as productsRouter } from "./routes/products.js";
import { default as cartsRouter } from "./routes/carts.js";
import { default as viewsRouter } from "./routes/views.js";
import * as Utils from "./utils/utils.js";
import ProductManager from "./services/ProductManager.js";

const PORT = process.env.PORT || 8080;
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
app.use(express.static('./public'));
app.use("/", viewsRouter);



const httpServer = app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  
  socket.on('new-product', async () => {
    const pm = new ProductManager(Utils.PATH_PRODUCTS);
    let productos = []
    try {
      productos = await pm.getProducts();
    } catch (e) {
      productos = [];
    }
    socketServer.sockets.emit('all_productos', productos);
  });
});