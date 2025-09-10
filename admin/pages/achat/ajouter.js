import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/FormulaireAdmin.module.css';
import AdminCalendar from "../../components/AdminCalendar";


export default function Ajouter() {
 
  const [form, setForm] = useState({
    title: '',
    reference:'',
    price: '',
    location: '',
    type: '',
    images: [],
    surface: '',
    rooms: '',
    chambres: '',
    bathrooms: '',
        wc: '',

    floor: '',
    yearBuilt: '',
    description: '',
    heatingType: '',
    energyRating: '',
    taxe: '',
    charge: '',
    balcon: false,
    terrasse: false,
    garage: false,
    parking: false,
    captureEvents: false,
    ascenseur: false,
    interphone: false,
    piscine: false,
    jardin: false,
    
    ges: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const locations = [
    "Rivedoux-Plage", "Sainte-Marie-de-Ré", "La Flotte", "Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré", "La Couarde-sur-Mer", "Loix", "Ars-en-Ré",
    "Saint-Clément-des-Baleines", "Les-Portes-en-Ré"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
   setForm((prev) => ({
  ...prev,
  [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
}));

  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'unsigned_preset'); // ← à remplacer par ton vrai preset

      const res = await fetch('https://api.cloudinary.com/v1_1/dcua9jmdz/image/upload', {
        method: 'POST',
        body: data,
      });

      const fileData = await res.json();
      return fileData.secure_url;
    });

    const urls = await Promise.all(uploadPromises);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    setImagePreviews((prev) => [...prev, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      alert("Veuillez ajouter au moins une image !");
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/achat');
  };
  
  return (
    <div className={styles.formContainer}>
      <button type="button" className={styles.backButton} onClick={() => router.back()}>← Retour</button>
      <h1 className={styles.formTitle}>Ajouter un bien</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="title" placeholder="Titre" onChange={handleChange} required className={styles.input} />
        <input
            className={styles.input}
            name="reference"
            placeholder="reference"
            onChange={handleChange}
            required
          />
        <select name="location" onChange={handleChange} value={form.location} className={styles.input} required>
          <option value="">Choisissez une localisation</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <input name="price" placeholder="Prix (€)" type="number" onChange={handleChange} required className={styles.input} />
        <input name="type" placeholder="Type de bien (Maison, Appartement…)" onChange={handleChange} className={styles.input} />
 
 
 <textarea
          name="description"
          placeholder="Description du bien"
          onChange={handleChange}
          rows="4"
          className={styles.textarea}
        />


        <h2 className={styles.sectionTitle}>Informations générales</h2>
        <input name="surface" placeholder="Surface habitable (m²)" type="number" onChange={handleChange} className={styles.input} />
        <input name="rooms" placeholder="Nombre de pièces" type="number" onChange={handleChange} className={styles.input} />
        <input name="chambres" placeholder="Nombre de chambres" type="number" onChange={handleChange} className={styles.input} />
        <input name="bathrooms" placeholder="Nombre de salles de bain" type="number" onChange={handleChange} className={styles.input} />
        <input name="wc" placeholder="Nombre de WC" type="number" onChange={handleChange} className={styles.input} />

        <h2 className={styles.sectionTitle}>Caractéristiques</h2>
        <input name="yearBuilt" placeholder="Année de construction" type="number" onChange={handleChange} className={styles.input} />
        <select name="heatingType" onChange={handleChange} className={styles.input}>
          <option value="">Type de chauffage</option>
          <option value="électrique">Électrique</option>
          <option value="gaz">Gaz</option>
          <option value="bois">Bois</option>
          <option value="pompe à chaleur">Pompe à chaleur</option>
          <option value="autre">Autre</option>
        </select>
        <input name="energyRating" placeholder="Performance énergétique (ex: DPE A, B…)" onChange={handleChange} className={styles.input} />
        <input name="ges" placeholder="GES (ex: A, B, C...)" onChange={handleChange} className={styles.input} />

        <h2 className={styles.sectionTitle}>Équipements</h2>
        <label><input type="checkbox" name="garage" onChange={handleChange} /> Garage</label>
        <label><input type="checkbox" name="jardin" onChange={handleChange} /> Jardin</label>
        <label><input type="checkbox" name="piscine" onChange={handleChange} /> Piscine</label>
        <label><input type="checkbox" name="terrasse" onChange={handleChange} /> Terrasse</label>
        <label><input type="checkbox" name="balcon" onChange={handleChange} /> Balcon</label>
        <label><input type="checkbox" name="parking" onChange={handleChange} /> Parking</label>
        <label><input type="checkbox" name="cave" onChange={handleChange} /> Cave</label>
        <label><input type="checkbox" name="ascenseur" onChange={handleChange} /> Ascenseur</label>
        <label><input type="checkbox" name="interphone" onChange={handleChange} /> Interphone</label>
        <label><input type="checkbox" name="climatisation" onChange={handleChange} /> Climatisation</label>

        <h2 className={styles.sectionTitle}>Informations administratives</h2>
        <input name="charge" placeholder="Charges mensuelles (€)" type="number" onChange={handleChange} className={styles.input} />
        <input name="taxe" placeholder="Taxe foncière (€)" type="number" onChange={handleChange} className={styles.input} />

       

        <label className={styles.label}>Ajoutez plusieurs photos :</label>
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
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
          style={{ display: 'none' }}
        />
        {imagePreviews.length > 0 && (
          <div className={styles.imagePreview}>
            {imagePreviews.map((url, idx) => (
              <div key={idx} className={styles.previewContainer}>
                <img src={url} alt={`preview-${idx}`} className={styles.previewImage} />
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
