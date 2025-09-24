import { useState, useRef } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";
import styles from "../../styles/FormulaireAdmin.module.css";

export default function AjouterLocationSaisonniere() {
  const [form, setForm] = useState({
    title: "",
    reference: "",
    location: "",
    price: "",
      address: "", // ✅ AJOUTE-MOI ICI
    type: "",
    surface: "",
    rooms: "",
    chambre: "",
    bathrooms: "",
    wc: "",
    floor: "",
    capacity: "",
    yearBuilt: "",
    heatingType: "",
    energyRating: "",
    ges: "",
    
   
    description: "",
    images: [],
  });

 // --- Exemple : équipements regroupés par catégories
const EQUIPMENT_CATEGORIES = {
  Cuisine: [
    "Lave-vaisselle",
    "Réfrigérateur",
    "Congélateur",
    "Cuisinière",
    "Four",
    "Micro-ondes",
    "Cafetière",
    "Bouilloire",
    "Grille-pain",
    "Vaisselle & couverts",
  ],
  Confort: [
    "Cheminée",
    "Climatisation",
    "Chauffage",
    "Télévision",
    "Wifi",
    "Lave-linge",
    "Sèche-linge",
    "Fer à repasser",
    "Aspirateur",
  ],
  "Salle de bain": [
    "Douche",
    "Baignoire",
    "Sèche-cheveux",
    "Serviettes fournies",
  ],
   Enfants: [
    "Lit bébé",
    "Chaise haute",
    "Jeux de société",
    "Livres pour enfants",
    "Jouets",
    "Vaisselle enfant",
    "Barrière de sécurité",
  ],
  Extérieur: [
    "Terrasse",
    "Balcon",
    "Jardin",
    "Salon de jardin",
    "Barbecue",
    "Piscine",
    "Jacuzzi",
    "Parking privé",
  ],
  Divers: [
    "Animaux acceptés",
    "Non-fumeur",
    "Accessible PMR",
    "Coffre-fort",
  ],
};

  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();
    const [suggestions, setSuggestions] = useState([]);


  const locations = [
    "Rivedoux-Plage",
    "Sainte-Marie-de-Ré",
    "La Flotte",
    "Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré",
    "La Couarde-sur-Mer",
    "Loix",
    "Ars-en-Ré",
    "Saint-Clément-des-Baleines",
    "Les-Portes-en-Ré",
    "La Rochelle",
    "Lagord",
    "Périgny",
    "Dompierre-sur-Mer",
    "Marsilly",
    "Nieul-sur-Mer",
    "Châtelaillon-Plage",
    "Fouras",
    "Aytré",
    "Angoulins",
    "L'Houmeau",
    "Saint-Xandre",
  ];

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Autocomplete adresse (désactivé la partie lat/lng et map)
  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setForm(prev => ({ ...prev, address }));

    if (address.length < 3) {
      setSuggestions([]);
      return;
    }

    const token = 'pk.eyJ1IjoiZWxvdWFubWF1cmljZSIsImEiOiJjbWZybjFsNDIwYnU5MmtxeHpmbjQyMjZiIn0.tAQPm55qOfTvL_IpsFinVA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?autocomplete=true&limit=5&access_token=${token}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (err) {
      console.error("Erreur autocomplete:", err);
    }
  };

  // Quand on clique sur une suggestion
  const handleSelectSuggestion = (feature) => {
    setForm(prev => ({ ...prev, address: feature.place_name }));
    setSuggestions([]);
  };
  

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = await Promise.all(
      files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "unsigned_preset");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dcua9jmdz/image/upload",
          { method: "POST", body: data }
        );
        const json = await res.json();
        return json.secure_url;
      })
    );
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    setImagePreviews((prev) => [...prev, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };


  // --- State
const [selectedEquipments, setSelectedEquipments] = useState([]);

// --- Handler
const handleEquipmentChange = (equipment) => {
  setSelectedEquipments((prev) =>
    prev.includes(equipment)
      ? prev.filter((e) => e !== equipment)
      : [...prev, equipment]
  );
};

  const handleSubmit = async (e) => {
          console.log("DATA ENVOYÉ AU BACKEND :", data);

    e.preventDefault();
    const data = {

      ...form,
      price: (form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
      chambre: Number(form.chambre),
      bathrooms: Number(form.bathrooms),
      wc: Number(form.wc),
      capacity: Number(form.capacity),
        equipments: selectedEquipments,

    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      
    });
    router.push("/location-saisonniere");
  };

  return (
    <AdminLayout>
      <div className={styles.formContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.back()}
        >
          ← Retour
        </button>
        <h1 className={styles.formTitle}>Ajouter une location saisonnière</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Infos principales */}
          <label className={styles.label}>Titre</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label className={styles.label}>Référence</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label className={styles.label}>Localisation</label>
          <select
            name="location"
            onChange={handleChange}
            value={form.location}
            className={styles.input}
            required
          >
            <option value="">Choisissez une localisation</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
{/* Champ adresse + suggestions */}
        <input
          name="address"
          placeholder="Adresse complète"
          onChange={handleAddressChange}
          value={form.address}
          required
          className={styles.input}
        />
        {suggestions.length > 0 && (
          <ul style={{ background: "white", border: "1px solid #ccc", marginTop: "0", padding: "5px", listStyle: "none", maxHeight: "150px", overflowY: "auto" }}>
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => handleSelectSuggestion(s)}
              >
                {s.place_name}
              </li>
            ))}
          </ul>
        )}
          <label className={styles.label}>Prix à la semaine (€)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label className={styles.label}>Type de bien</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Type de bien</option>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
            <option value="Autre">Autre</option>
          </select>

          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            rows="4"
            className={styles.textarea}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />

          {/* Infos générales */}
          <h2 className={styles.sectionTitle}>Informations générales</h2>
          <label className={styles.label}>Surface habitable (m²)</label>
          <input
            name="surface"
            value={form.surface}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Nombre de pièces</label>
          <input
            name="rooms"
            value={form.rooms}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Nombre de chambres</label>
          <input
            name="chambre"
            value={form.chambre}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Salles de bain</label>
          <input
            name="bathrooms"
            value={form.bathrooms}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>WC</label>
          <input
            name="wc"
            value={form.wc}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Étage</label>
          <input
            name="floor"
            value={form.floor}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Capacité (personnes)</label>
          <input
            name="capacity"
            value={form.capacity}
            type="number"
            onChange={handleChange}
            className={styles.input}
          />


          
         

{Object.entries(EQUIPMENT_CATEGORIES).map(([category, equipments]) => (
  <div key={category} className={styles.group}>
    <label>{category}</label>
    <div className={styles.typeButtons}>
      {equipments.map((eq) => (
        <button
          key={eq}
          type="button"
          className={`${styles.typeButton} ${
            selectedEquipments.includes(eq) ? styles.selected : ""
          }`}
          onClick={() => handleEquipmentChange(eq)}
        >
          {eq}
        </button>
      ))}
    </div>
  </div>
))}
          

          {/* Images */}
          <h2 className={styles.sectionTitle}>Images</h2>
          <label className={styles.label}>Ajoutez plusieurs photos :</label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={styles.input}
          >
            Ajouter des images
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {imagePreviews.length > 0 && (
            <div className={styles.imagePreview}>
              {imagePreviews.map((url, idx) => (
                <div key={idx} className={styles.previewContainer}>
                  <img
                    src={url}
                    alt={`preview-${idx}`}
                    className={styles.previewImage}
                  />
                  <button type="button" onClick={() => removeImage(idx)}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            style={{ marginTop: "1rem" }}
          >
            Ajouter
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
