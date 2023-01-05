import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "Frase inicial";

app.get("/api/frase", (req, res) => {
  res.send({ frase: frase });
});

app.get("/api/palabras/:pos", (req, res) => {
  let palabras = frase.split(" ");
  let position = req.params.pos;
  position = position.slice(1);
  if (isNaN(position)) {
    res.status(400).send("position must be a number");
  } else if (position > palabras.length) {
    res.send({ success: false, message: "There is no word in that position" });
  } else {
    res.send({ buscada: palabras[position - 1] });
  }
});

app.post("/api/palabras", (req, res) => {
  let word = req.body;
  if (!word.palabra) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  frase += " " + word.palabra;
  let palabras = frase.split(" ");
  let pos = palabras.length;
  res.send({ agregada: word.palabra, pos: pos });
});

app.put("/api/palabras/:position", (req, res) => {
  let word = req.body;
  if (!word.palabra) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  let palabras = frase.split(" ");
  let position = req.params.position;
  position = position.slice(1);
  if (isNaN(position)) {
    res.status(400).send("position must be a number");
  } else if (position > palabras.length) {
    res.send({ success: false, message: "There is no word in that position" });
  } else {
    let anterior = palabras[position - 1];
    palabras[position - 1] = word.palabra;
    frase = palabras.join(" ");
    res.send({ actualizada: word.palabra, anterior: anterior });
  }
});

app.delete("/api/palabras/:position", (req, res) => {
  let palabras = frase.split(" ");
  let position = req.params.position;
  position = position.slice(1);
  if (isNaN(position)) {
    res.status(400).send("position must be a number");
  } else if (position > palabras.length) {
    res.send({ success: false, message: "There is no word in that position" });
  } else {
    let borrada = palabras[position - 1];
    let beginingArray = palabras.slice(0, position - 1);
    let finalArray = palabras.slice(position);
    beginingArray.push(...finalArray);
    frase = beginingArray.join(" ");
    res.send({ deleted: true, "word deleted": borrada });
  }
});

app.listen(8080, () => console.log("Listening on 8080"));
