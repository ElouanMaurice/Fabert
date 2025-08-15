const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// 🔍 Récupérer tous les biens
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// 🔍 Récupérer un bien par son ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Bien non trouvé" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// POST : Ajouter un nouveau bien
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log("✅ Nouveau bien reçu :", data);
    const newProperty = new Property(data);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// PUT : Modifier un bien par son ID
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Bien non trouvé" });
    }
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// DELETE : Supprimer un bien par son ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Bien non trouvé" });
    }
    res.json({ message: "Bien supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

   
  

module.exports = router;
