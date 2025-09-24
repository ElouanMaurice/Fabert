const mongoose = require("mongoose");

const LocationAnnuelleSchema = new mongoose.Schema({
   title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  surface: { type: Number },
  surfaceterrain: { type: Number },
  rooms: { type: Number },
  chambre: { type: Number },
  bathrooms: { type: Number },
  wc: { type: Number },
  description: { type: String },
  reference: { type: String, required: true },
meuble: { type: Boolean },      // Meublé
  animaux: { type: Boolean }, 
    

  // Caractéristiques
  yearBuilt: { type: Number },
  floor: { type: Number },
  heatingType: { type: String },

  // ✅ Harmonisation
  balcon: { type: Boolean }, // pas "balcony"
  terrasse: { type: Boolean }, // pas "terrace"
  garage: { type: Boolean },
  parking: { type: Boolean },
  cave: { type: Boolean }, // pas "cellar"
  ascenseur: { type: Boolean }, // pas "elevator"
  interphone: { type: Boolean },
  piscine: { type: Boolean }, // pas "pool"
  jardin: { type: Boolean },
  climatisation: { type: Boolean }, // pas "airConditioning"

  // Admin
  charge: { type: Number }, // pas "charges"
  taxe: { type: Number }, // pas "propertyTax"

  energyRating: { type: String },
  ges: { type: String },

  images: { type: [String], required: true },

    address: { type: String }, 
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model("LocationAnnuelle", LocationAnnuelleSchema);
