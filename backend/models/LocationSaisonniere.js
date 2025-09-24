const mongoose = require("mongoose");

const LocationSaisonniereSchema = new mongoose.Schema({
  // Informations générales
  title: { type: String, required: true },
  reference: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true }, // prix par semaine
  type: { type: String }, // Maison, Appartement...
  surface: { type: Number },
  rooms: { type: Number },
  chambre: { type: Number },
  bathrooms: { type: Number },
  floor: { type: Number },
  capacity: { type: Number },
  description: { type: String },
    wc: { type: Number },

address: { type: String }, 
  lat: { type: Number },
  lng: { type: Number },

  // Caractéristiques
  yearBuilt: { type: Number },
  heatingType: { type: String },
  energyRating: { type: String },
  ges: { type: String },

  // Équipements
   equipments: [String],
  garage: { type: Boolean, default: false },
  garden: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  terrace: { type: Boolean, default: false },
  balcony: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },


  // Disponibilités
  availableDates: [{ type: Date }],

  // Images
  images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("LocationSaisonniere", LocationSaisonniereSchema);
