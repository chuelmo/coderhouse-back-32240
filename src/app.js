import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

app.use(cookieParser("CoderSecret"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/setCookie", (req, res) => {
  res
    .cookie("CookiePrueba", "Esta es mi primer cookie", { maxAge: 10000 })
    .send("Cookie");
});

app.get("/getCookie", (req, res) => {
  res.send(req.cookies.CookiePrueba);
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("CookiePrueba").send("Borre la cookie");
});

app.get("/setSignedCookie", (req, res) => {
  res
    .cookie("SignedCookie", "Cookie firmada", { maxAge: 30000, signed: true })
    .send("Cookie firmada en serio");
});

app.get("/getSignedCookie", (req, res) => {
  res.send(req.signedCookies);
});

app.get("/formulario", (req, res) => {
  res.render("formulario", { title: "soy handlebars" });
});

app.post("/createCookie", (req, res) => {
  const { userName, email } = req.body;
  res.cookie(userName, email, { maxAge: 10000 }).send("El post creo la cookie");
});

const server = app.listen(PORT, () => {
  console.log("Server up");
});
