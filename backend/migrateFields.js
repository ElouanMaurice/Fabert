require("dotenv").config({ path: "./backend/.env" }); // ← adapte le chemin si besoin
const mongoose = require("mongoose");
const Property = require("./models/Property"); // chemin correct vers ton modèle


async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "test", // attention à mettre la bonne base
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔗 Connecté à MongoDB");

    const update = {
      chambre: 0,
      wc: 0,
      terrasse: false,
      balcon: false,
      cave: false,
      ascenseur: false,
      interphone: false,
      piscine: false,
      jardin: false,
      climatisation: false,
      charge: 0,
      taxe: 0,
    };

    const result = await Property.updateMany({}, { $set: update });

    console.log(`✅ Documents mis à jour : ${result.modifiedCount}`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erreur :", err);
    mongoose.connection.close();
  }
}

migrate();
