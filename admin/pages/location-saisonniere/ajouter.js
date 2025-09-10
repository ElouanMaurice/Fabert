import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/FormulaireAdmin.module.css';

export default function AjouterLocationSaisonniere() {
  const [form, setForm] = useState({
    title: '', reference: '', location: '', price: '', type: '',
    surface: '', rooms: '', bedrooms: '', bathrooms: '', floor: '', capacity: '',
    yearBuilt: '', heatingType: '', energyRating: '', ges: '',
    garage: false, garden: false, pool: false, terrace: false, balcony: false,
    parking: false, cellar: false, elevator: false, intercom: false, airConditioning: false,
    description: '', images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const locations = ["Rivedoux-Plage","Sainte-Marie-de-Ré","La Flotte","Saint-Martin-de-Ré",
                     "Le Bois-Plage-en-Ré","La Couarde-sur-Mer","Loix","Ars-en-Ré",
                     "Saint-Clément-des-Baleines","Les-Portes-en-Ré"];

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = async e => {
    const files = Array.from(e.target.files);
    const urls = await Promise.all(files.map(async file => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'unsigned_preset'); 
      const res = await fetch('https://api.cloudinary.com/v1_1/dcua9jmdz/image/upload', { method: 'POST', body: data });
      const json = await res.json();
      return json.secure_url;
    }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }));
    setImagePreviews(prev => [...prev, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const removeImage = idx => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = { ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      capacity: Number(form.capacity)
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    router.push('/location-saisonniere');
  };

  return (
    <AdminLayout>
      <div className={styles.formContainer}>
        <button type="button" className={styles.backButton} onClick={() => router.back()}>← Retour</button>
        <h1 className={styles.formTitle}>Ajouter une location saisonnière</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="title" placeholder="Titre" onChange={handleChange} required className={styles.input} />
          <input name="reference" placeholder="Référence" onChange={handleChange} required className={styles.input} />
          <select name="location" onChange={handleChange} value={form.location} className={styles.input} required>
            <option value="">Choisissez une localisation</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <input name="price" placeholder="Prix à la semaine (€)" type="number" onChange={handleChange} required className={styles.input} />
          <input name="type" placeholder="Type de bien (Maison, Appartement…)" onChange={handleChange} className={styles.input} />
          <textarea name="description" placeholder="Description" onChange={handleChange} rows="4" className={styles.textarea} />

          <h2 className={styles.sectionTitle}>Informations générales</h2>
          {['surface','rooms','bedrooms','bathrooms','floor','capacity'].map(field => (
            <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} type="number" onChange={handleChange} className={styles.input} />
          ))}

          <h2 className={styles.sectionTitle}>Équipements</h2>
          {['garage','garden','pool','terrace','balcony','parking','cellar','elevator','intercom','airConditioning'].map(equip => (
            <label key={equip}>
              <input type="checkbox" name={equip} checked={form[equip]} onChange={handleChange} /> {equip.charAt(0).toUpperCase() + equip.slice(1)}
            </label>
          ))}

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
          <input name="energyRating" placeholder="Performance énergétique (DPE)" onChange={handleChange} className={styles.input} />
          <input name="ges" placeholder="GES" onChange={handleChange} className={styles.input} />

          <label className={styles.label}>Ajoutez plusieurs photos :</label>
          <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} className={styles.input}>Ajouter des images</button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />

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

          <button type="submit" className={styles.submitButton} style={{ marginTop: '1rem' }}>Ajouter</button>
        </form>
      </div>
    </AdminLayout>
  );
}
