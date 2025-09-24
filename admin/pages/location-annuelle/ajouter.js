import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/FormulaireAdmin.module.css';
import Image from "next/image";


export default function AjouterLocationAnnuelle() {
  const [form, setForm] = useState({
    title: '',
    reference: '',
    location: '',
    price: '',
    type: '',
    surface: '',
    rooms: '',
    chambre: '',
    bathrooms: '',
    floor: '',
    yearBuilt: '',
    heatingType: '',
    charge: '',
    taxe: '',
    coOwnership: false,
    numberOfLots: '',
    meuble: false,      // Meublé
  animaux: false, 
    garage: false,
    jardin: false,
    piscine: false,
    terrasse: false,
    balcon: false,
    parking: false,
    cellar: false,
    elevator: false,
    intercom: false,
    airConditioning: false,
    description: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

  const fileInputRef = useRef(null);
  const router = useRouter();

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
    "Les-Portes-en-Ré", "La Rochelle", "Lagord", "Périgny",
    "Dompierre-sur-Mer", "Marsilly", "Nieul-sur-Mer", "Châtelaillon-Plage",
    "Fouras", "Aytré", "Angoulins", "L'Houmeau", "Saint-Xandre"
  ];

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'unsigned_preset'); // Cloudinary preset
      const res = await fetch(`https://api.cloudinary.com/v1_1/dcua9jmdz/image/upload`, { method: 'POST', body: data });
      const fileData = await res.json();
      return fileData.secure_url;
    });
    const urls = await Promise.all(uploadPromises);
    setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }));
    setImagePreviews(prev => [...prev, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), surface: Number(form.surface), rooms: Number(form.rooms) };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/location-annuelle');
  };

  return (<div className={styles.formContainer}>
      <button type="button" className={styles.backButton} onClick={() => router.back()}>← Retour</button>
      <h1 className={styles.formTitle}>Ajouter un bien</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Informations principales */}
        <input name="title" placeholder="Titre" onChange={handleChange} required className={styles.input} />
        <input name="reference" placeholder="Référence" onChange={handleChange} required className={styles.input} />
        <select name="location" onChange={handleChange} value={form.location} className={styles.input} required>
          <option value="">Choisissez une localisation</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
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

        <input name="price" placeholder="Prix (€)" type="number" onChange={handleChange} required className={styles.input} />
        <select name="type" onChange={handleChange} value={form.type} className={styles.input} required>
          <option value="">Type de bien</option>
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
          <option value="Garage">Garage</option>
          <option value="Terrain">Terrain</option>
          <option value="Bureau">Bureau</option>
          <option value="Local commercial">Local commercial</option>
          <option value="Parking">Parking</option>
          <option value="Autre">Autre</option>
        </select>

<textarea
  name="description"
  placeholder="Description"
  rows="4"  // hauteur de départ
  className={styles.textarea}
  onChange={(e) => {
    handleChange(e);
    e.target.style.height = "auto"; // réinitialise la hauteur
    e.target.style.height = e.target.scrollHeight + "px"; // ajuste selon le texte
  }}
/>

        {/* Informations générales */}
        <h2 className={styles.sectionTitle}>Informations générales</h2>

        <input name="surface" placeholder="Surface habitable (m²)" type="number" onChange={handleChange} className={styles.input} />
        <input name="rooms" placeholder="Nombre de pièces" type="number" onChange={handleChange} className={styles.input} />
        <input name="chambre" placeholder="Nombre de chambres" type="number" onChange={handleChange} className={styles.input} />
        <input name="bathrooms" placeholder="Nombre de salles de bain" type="number" onChange={handleChange} className={styles.input} />
        <input name="wc" placeholder="Nombre de WC" type="number" onChange={handleChange} className={styles.input} />
<label className={styles.toggle}>
  <input
    type="checkbox"
    name="meuble"
    checked={form.meuble}
    onChange={handleChange}
  />
  <span className={styles.slider}></span>
  <span className={styles.labelText}>Meublé</span>
</label>

<label className={styles.toggle}>
  <input
    type="checkbox"
    name="animaux"
    checked={form.animaux}
    onChange={handleChange}
  />
  <span className={styles.slider}></span>
  <span className={styles.labelText}>Animaux autorisés</span>
</label>

       
        {/* Équipements */}
        <h2 className={styles.sectionTitle}>Équipements</h2>
        {['garage','balcon','terrasse','parking','cave','piscine','jardin'].map(eq => (
          <label key={eq}>
            <input type="checkbox" name={eq} onChange={handleChange} /> {eq.charAt(0).toUpperCase() + eq.slice(1)}
          </label>
        ))}

        {/* Informations administratives */}
        <h2 className={styles.sectionTitle}>Informations administratives</h2>
        <input name="charge" placeholder="Charges mensuelles (€)" type="number" onChange={handleChange} className={styles.input} />
        <input name="taxe" placeholder="Taxe foncière (€)" type="number" onChange={handleChange} className={styles.input} />

        {/* Images */}
        <label className={styles.label}>Ajoutez plusieurs photos :</label>
        <button type="button" onClick={() => fileInputRef.current?.click()} className={styles.input}>Ajouter des images</button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
        {imagePreviews.length > 0 && (
          <div className={styles.imagePreview}>
            {imagePreviews.map((url, idx) => (
              <div key={idx} className={styles.previewContainer}>
                <Image src={url} alt={`preview-${idx}`} width={200} height={150} className={styles.previewImage} />
                <button type="button" onClick={() => removeImage(idx)}>❌</button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className={styles.submitButton}>Ajouter</button>
      </form>
    </div>
  );
}
