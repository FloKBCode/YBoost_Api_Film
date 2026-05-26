const express = require("express");
const path = require("path");
let films = require("./db-films");
let helper = require("./helper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// GET all films
app.get("/api/films", (req, res) => {
  const message = `Liste de ${films.length} films`;
  res.json(helper.success(message, films));
});

// GET one film by id
app.get("/api/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find((f) => f.id === id);
  if (!film) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  res.json(helper.success("Film trouvé !", film));
});

// POST create a film
app.post("/api/films", (req, res) => {
  const newFilm = {
    id: films.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
  };
  films.push(newFilm);
  res.status(201).json(helper.success("Film créé !", newFilm));
});

// PUT update a film
app.put("/api/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = films.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  films[index] = { id, ...req.body };
  res.json(helper.success("Film modifié !", films[index]));
});

// DELETE a film
app.delete("/api/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = films.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  const deleted = films.splice(index, 1);
  res.json(helper.success("Film supprimé !", deleted[0]));
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
