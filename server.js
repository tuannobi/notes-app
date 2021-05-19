const dbSetup = require("./db/db-setup");
const express = require("express");
const Note = require("./model/note");

dbSetup();

const port = 3000;
const app = express();
app.use(express.json());

//
app.get("/api/notes", async (req, res, next) => {
  try {
    const { id } = req.params;
    const notes = await Note.query();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get("/api/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.query().findById(id);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.post("/api/notes", async (req, res, next) => {
  try {
    const note = await Note.query().insert(req.body);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.put("/api/notes", async (req, res, next) => {
  try {
    const note = await Note.query().patchAndFetchById(req.body.id, req.body);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.delete("/api/notes", async (req, res, next) => {
  try {
    const note = await Note.query().deleteById(req.body.id);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
