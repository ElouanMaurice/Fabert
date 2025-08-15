const mongoose = require("mongoose");

const LocationAnnuelleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reference: { type: String, required: true },

  location: { type: String, required: true },
  price: { type: Number, required: true }, // loyer mensuel
  images: [String],
  surface: { type: Number, required: false }, // en m²
  rooms: { type: Number, required: false },
  furnished: { type: Boolean, default: false },
  description: { type: String },
});

module.exports = mongoose.model("LocationAnnuelle", LocationAnnuelleSchema);
