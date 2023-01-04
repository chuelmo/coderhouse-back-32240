import express from "express";

const app = express();

app.get("/saludo", (req, res) => {
  res.send("Mi primer server express");
});

const PORT = 8181;
app.listen(PORT, () => console.log(`Server escuchando en el puerto ${PORT}`));
