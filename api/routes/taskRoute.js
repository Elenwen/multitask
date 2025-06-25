const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../util/verifyToken");

const router = express.Router();

router.get("/task", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

router.post("/task", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim().length == 0) {
      return res
        .status(400)
        .json({ message: "Veuillez rentrez toutes les informations" });
    }
    const task = { title, userId: req.user.id };
    await Task.create(task);
    res.status(201).json({ message: "Tâche ajouté!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});
router.delete("/task/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "La tâche a été supprimé!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de tâche" });
  }
});
router.put("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  await Task.findByIdAndUpdate(id, task);
  res.status(200).json({ message: "La tâche a été modifié" });
});

module.exports = router;
