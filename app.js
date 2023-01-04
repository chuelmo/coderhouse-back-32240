import express from "express";
import path from "path";
const app = express();

app.get("/bienvenida", (req, res) => {
  res.send(`<h1 style="color:blue;">Aquí tenemos nuestro primer GET</h1>`);
});

app.get("/usuario", (req, res) => {
  res.send({
    nombre: "Andrea",
    apellido: "López",
    edad: 30,
    correo: "andrea.lopez@gmail.com",
  });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(path.resolve() + "/about.html"));
});

app.listen(8080, () => console.log("Listening on 8080"));
