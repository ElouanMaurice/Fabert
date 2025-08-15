const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  // Informations générales
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  surface: { type: Number },
  rooms: { type: Number },
  description: { type: String },
  reference: { type: String, required: true },


  // Caractéristiques du bien
  yearBuilt: { type: Number },
  floor: { type: Number },
  totalFloors: { type: Number },
  exposure: { type: String },
  view: { type: String },
  heatingType: { type: String },
  hotWater: { type: String },

  // Équipements & prestations
  balcony: { type: Boolean },
  terrace: { type: Boolean },
  garage: { type: Boolean },
  parking: { type: Boolean },
  cellar: { type: Boolean },
  elevator: { type: Boolean },
  intercom: { type: Boolean },
  pool: { type: Boolean },
  garden: { type: Boolean },
  airConditioning: { type: Boolean },

  // Informations administratives
  charges: { type: Number },
  propertyTax: { type: Number },
  coOwnership: { type: Boolean },
  numberOfLots: { type: Number },
  energyRating: { type: String },
  ges: { type: String },

  // Images
  images: { type: [String], required: true }
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
