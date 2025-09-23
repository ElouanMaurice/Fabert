import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/AdminLayout";
import styles from "../../../styles/FormulaireAdmin.module.css";

export default function ModifierLocationSaisonniere() {
  const [form, setForm] = useState(null); // on initialise à null en attendant le fetch
  const [imagePreviews, setImagePreviews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;

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

  // Charger les infos existantes
  useEffect(() => {
    if (!id) return;
    const fetchLocation = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres/${id}`
        );
        const data = await res.json();
        setForm(data);
        setImagePreviews(data.images || []);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchLocation();
  }, [id]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Autocomplete adresse
  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setForm((prev) => ({ ...prev, address }));

    if (address.length < 3) {
      setSuggestions([]);
      return;
    }

    const token =
      "pk.eyJ1IjoiZWxvdWFubWF1cmljZSIsImEiOiJjbWZybjFsNDIwYnU5MmtxeHpmbjQyMjZiIn0.tAQPm55qOfTvL_IpsFinVA";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?autocomplete=true&limit=5&access_token=${token}`;

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

  const handleSelectSuggestion = (s) => {
    setForm((prev) => ({ ...prev, address: s.place_name }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
      chambre: Number(form.chambre),
      bathrooms: Number(form.bathrooms),
      wc: Number(form.wc),
      capacity: Number(form.capacity),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    router.push("/location-saisonniere");
  };

  if (!form) return <p>Chargement...</p>;

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
        <h1 className={styles.formTitle}>
          Modifier la location saisonnière : {form.title}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* --- mêmes champs que Ajouter, mais avec value={form.xxx} --- */}

          <label className={styles.label}>Titre</label>
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label className={styles.label}>Référence</label>
          <input
            name="reference"
            value={form.reference || ""}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <label className={styles.label}>Localisation</label>
          <select
            name="location"
            onChange={handleChange}
            value={form.location || ""}
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

          {/* Adresse */}
          <input
            name="address"
            placeholder="Adresse complète"
            onChange={handleAddressChange}
            value={form.address || ""}
            className={styles.input}
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                background: "white",
                border: "1px solid #ccc",
                marginTop: "0",
                padding: "5px",
                listStyle: "none",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
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

             <label className={styles.label}>Prix (€ / mois)</label>
        <input name="price" value={form.price} type="number" onChange={handleChange} placeholder="Prix (€)" className={styles.input} required />

        <label className={styles.label}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="4" className={styles.textarea} />

        {/* Informations générales */}
        <h2 className={styles.sectionTitle}>Informations générales</h2>
        <label className={styles.label}>Surface habitable (m²)</label>
        <input name="surface" value={form.surface} type="number" onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Nombre de pièces</label>
        <input name="rooms" value={form.rooms} type="number" onChange={handleChange} className={styles.input} />

        <label className={styles.label}>Nombre de chambres</label>
        <input name="chambre" value={form.chambre} type="number" onChange={handleChange} className={styles.input} />

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
        {/* Options */}
        <h2 className={styles.sectionTitle}>Options</h2>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="meuble" checked={form.meuble} onChange={handleChange} /> Meublé
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="animaux" checked={form.animaux} onChange={handleChange} /> Animaux autorisés
        </label>

        {/* Équipements */}
        <h2 className={styles.sectionTitle}>Équipements</h2>
        {['garage','balcon','terrasse','parking','ascenseur','interphone','piscine','jardin','climatisation'].map(eq => (
          <label key={eq} className={styles.checkboxLabel}>
            <input type="checkbox" name={eq} checked={form[eq]} onChange={handleChange} /> {eq.charAt(0).toUpperCase() + eq.slice(1)}
          </label>
        ))}

          {/* Images */}
          <h2 className={styles.sectionTitle}>Images</h2>
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
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
