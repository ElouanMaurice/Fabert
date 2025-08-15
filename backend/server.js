

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
console.log("🔍 MONGO_URI chargé :", process.env.MONGO_URI);

const app = express();

// Origines autorisées pour CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware OPTIONS
app.options('*', cors());

// Middleware pour parser le JSON dans les requêtes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Logger simple des requêtes
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Erreur : MONGO_URI n'est pas défini dans le fichier .env !");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err);
    process.exit(1);
  });

// Route de test simple
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API KTI Immo !");
});

// Import des routes
const propertyRoutes = require("./routes/propertyRoutes");
const locationAnnuelleRoutes = require("./routes/locationAnnuelleRoutes");
const locationSaisonniereRoutes = require("./routes/locationSaisonniereRoutes");

// Utilisation des routes
app.use("/api/properties", propertyRoutes);
app.use("/api/locations-annuelles", locationAnnuelleRoutes);
app.use("/api/locations-saisonnieres", locationSaisonniereRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});



