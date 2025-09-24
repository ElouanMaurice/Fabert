import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import Image from 'next/image';
import styles from '../../../styles/FormulaireAdmin.module.css';

export default function ModifierLocationAnnuelle() {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [form, setForm] = useState({
    title: '', reference: '', price: '', location: '', address: '',
    images: [], surface: '', rooms: '', chambre: '',
    description: '', meuble: false, animaux: false,
    balcon: false, terrasse: false, garage: false, parking: false,
    ascenseur: false, interphone: false, piscine: false,
    jardin: false, climatisation: false,
  });

  const locations = [
    "Rivedoux-Plage","Sainte-Marie-de-Ré","La Flotte","Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré","La Couarde-sur-Mer","Loix","Ars-en-Ré",
    "Saint-Clément-des-Baleines","Les-Portes-en-Ré", "La Rochelle", "Lagord", "Périgny",
    "Dompierre-sur-Mer", "Marsilly", "Nieul-sur-Mer", "Châtelaillon-Plage",
    "Fouras", "Aytré", "Angoulins", "L'Houmeau", "Saint-Xandre"
  ];

  // Récupération de la location existante
  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          reference: data.reference || '',
          price: data.price || '',
          location: data.location || '',
          address: data.address || '',
          images: data.images || [],
          surface: data.surface || '',
          rooms: data.rooms || '',
          chambre: data.chambre || '',
          description: data.description || '',
          meuble: data.meuble || false,
          animaux: data.animaux || false,
          balcon: data.balcon || false,
          terrasse: data.terrasse || false,
          garage: data.garage || false,
          parking: data.parking || false,
          ascenseur: data.ascenseur || false,
          interphone: data.interphone || false,
          piscine: data.piscine || false,
          jardin: data.jardin || false,
          climatisation: data.climatisation || false,
        });

        if (data.images) setImagePreviews(data.images);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        ['price','surface','rooms','chambre'].includes(name)
        ? Number(value) : value
    }));
  };

  // Autocomplete adresse
  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setForm(prev => ({ ...prev, address }));

    if (address.length < 3) {
      setSuggestions([]);
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
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

  const handleSelectSuggestion = (feature) => {
    setForm(prev => ({ ...prev, address: feature.place_name }));
    setSuggestions([]);
  };

  // Gestion images
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadPromises = files.map(async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'unsigned_preset');
      const res = await fetch('https://api.cloudinary.com/v1_1/dcua9jmdz/image/upload', { method: 'POST', body: data });
      const fileData = await res.json();
      return fileData.secure_url;
    });

    const urls = await Promise.all(uploadPromises);
    setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }));
    setImagePreviews(prev => [...prev, ...urls].slice(0, 10));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.images.length) return alert("Ajoutez au moins une image !");
    if (!form.address) return alert("Adresse invalide !");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-annuelles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/location-annuelle');
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="button" className={styles.backButton} onClick={() => router.back()}>← Retour</button>
        
        {/* Informations principales */}
        <h2 className={styles.sectionTitle}>Informations principales</h2>
        <label className={styles.label}>Titre</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" className={styles.input} required />

        <label className={styles.label}>Référence</label>
        <input name="reference" value={form.reference} onChange={handleChange} placeholder="Référence" className={styles.input} required />

        <label className={styles.label}>Localisation</label>
        <select name="location" value={form.location} onChange={handleChange} className={styles.input} required>
          <option value="">Choisissez une localisation</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <label className={styles.label}>Adresse complète</label>
        <input
          name="address"
          placeholder="Adresse complète"
          value={form.address}
          onChange={handleAddressChange}
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
        {['garage','balcon','terrasse','parking','piscine','jardin'].map(eq => (
          <label key={eq} className={styles.checkboxLabel}>
            <input type="checkbox" name={eq} checked={form[eq]} onChange={handleChange} /> {eq.charAt(0).toUpperCase() + eq.slice(1)}
          </label>
        ))}

        {/* Images */}
        <h2 className={styles.sectionTitle}>Images</h2>
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

        {/* Bouton */}
        <button type="submit" className={styles.submitButton}>Enregistrer les modifications</button>
      </form>
    </AdminLayout>
  );
}
