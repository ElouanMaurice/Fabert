const mongoose = require("mongoose");

const LocationSaisonniereSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reference: { type: String, required: true },

  location: { type: String, required: true },
  price: { type: Number, required: false }, // prix par semaine
  images: [String],

  capacity: { type: Number, required: false }, // nombre de personnes
  availableDates: [{ type: Date }], // plages disponibles
  amenities: [{ type: String }], // équipements
  description: { type: String },
});

module.exports = mongoose.model("LocationSaisonniere", LocationSaisonniereSchema);
