import {  useRef } from 'react';
import { useState } from 'react';

import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/FormulaireAdmin.module.css';



export default function AjouterLocationSaisonniere() {
  const [form, setForm] = useState({
    title: '',
    reference:'',
    location: '',
    price: '',
    capacity: '',
    description: '',
    images: [],
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'unsigned_preset'); // Remplace par ton preset Cloudinary

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

    const data = {
      ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
    };
    

    

    await fetch('http://localhost:3001/api/locations-saisonnieres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/location-saisonniere');
  };

  return (
    <AdminLayout>
      <div className={styles.formContainer}>
        <button type="button" className={styles.backButton} onClick={() => router.back()}>
          ← Retour
        </button>
        <h1 className={styles.formTitle}>Ajouter une location saisonnière</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            name="title"
            placeholder="Titre"
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="reference"
            placeholder="reference"
            onChange={handleChange}
            required
          />

          <select
            name="location"
            onChange={handleChange}
            value={form.location}
            className={styles.input}
            required
          >
            <option value="">Choisissez une localisation</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <input
            className={styles.input}
            name="price"
            placeholder="Prix à la semaine"
            type="number"
            onChange={handleChange}
            required
          />

          <input
            className={styles.input}
            name="capacity"
            placeholder="Capacité (pers.)"
            type="number"
            onChange={handleChange}
          />

          <textarea
            className={styles.input}
            name="description"
            placeholder="Description"
            rows={4}
            onChange={handleChange}
          />

          {/* Images upload ici */}
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

          <button type="submit" className={styles.submitButton} style={{ marginTop: '1rem' }}>
            Ajouter
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
