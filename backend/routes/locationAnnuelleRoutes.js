const express = require("express");
const LocationAnnuelle = require("../models/LocationAnnuelle");
const router = express.Router();

// GET all locations annuelles
router.get("/", async (req, res) => {
  try {
    const data = await LocationAnnuelle.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// GET one location annuelle by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await LocationAnnuelle.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Bien non trouvé" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// POST create new location annuelle
router.post("/", async (req, res) => {
  try {
    const newItem = new LocationAnnuelle(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// PUT update location annuelle by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await LocationAnnuelle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Bien non trouvé" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// DELETE location annuelle by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await LocationAnnuelle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bien non trouvé" });
    res.json({ message: "Bien supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
