import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styles from '../../styles/FormulaireAdmin.module.css';
import Image from 'next/image';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import RecenterMap from '../../components/RecenterMap';

// Leaflet côté client
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Icône Leaflet
const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Ajouter() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([46.159, -1.350]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [form, setForm] = useState({
    title: '', reference: '', price: '', type: '', location: '', address: '', lat: null, lng: null,
    images: [], surface: '', rooms: '', chambre: '', bathrooms: '', wc: '', floor: '', yearBuilt: '',
    description: '', heatingType: '', energyRating: '', taxe: '', charge: '', balcon: false, terrasse: false,
    garage: false, parking: false, ascenseur: false, interphone: false, piscine: false, jardin: false,
    climatisation: false, ges: '',
  });

  const locations = [
    "Rivedoux-Plage","Sainte-Marie-de-Ré","La Flotte","Saint-Martin-de-Ré",
    "Le Bois-Plage-en-Ré","La Couarde-sur-Mer","Loix","Ars-en-Ré",
    "Saint-Clément-des-Baleines","Les-Portes-en-Ré"
  ];

  useEffect(() => setIsClient(true), []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
        ['price','surface','rooms','chambre','bathrooms','wc','yearBuilt','floor','charge','taxe'].includes(name)
        ? Number(value) : value
    }));
  };

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setForm(prev => ({ ...prev, address }));
    if (address.length < 5) return;

    const token = 'pk.eyJ1IjoiZWxvdWFubWF1cmljZSIsImEiOiJjbWZybjFsNDIwYnU5MmtxeHpmbjQyMjZiIn0.tAQPm55qOfTvL_IpsFinVA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setForm(prev => ({ ...prev, lat, lng }));
        setMarkerPosition([lat, lng]);
      }
    } catch (err) {
      console.error('Erreur géocodage:', err);
    }
  };

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
    if (!form.lat || !form.lng) return alert("Adresse invalide !");

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
        {/* Informations principales */}
        <input name="title" placeholder="Titre" onChange={handleChange} required className={styles.input} />
        <input name="reference" placeholder="Référence" onChange={handleChange} required className={styles.input} />
        <select name="location" onChange={handleChange} value={form.location} className={styles.input} required>
          <option value="">Choisissez une localisation</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <input name="address" placeholder="Adresse complète" onChange={handleAddressChange} value={form.address} required className={styles.input} />

        {/* Carte */}
        {isClient && (
          <div style={{ height: '300px', margin: '10px 0' }}>
            <MapContainer center={markerPosition} zoom={15} style={{ height: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
              <Marker position={markerPosition} icon={markerIcon}>
                <Popup>{form.address}</Popup>
              </Marker>
              <RecenterMap position={markerPosition} />
            </MapContainer>
          </div>
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

        <textarea name="description" placeholder="Description" onChange={handleChange} rows="4" className={styles.textarea} />

        {/* Informations générales */}
        <h2 className={styles.sectionTitle}>Informations générales</h2>
        <input name="surface" placeholder="Surface habitable (m²)" type="number" onChange={handleChange} className={styles.input} />
        <input name="rooms" placeholder="Nombre de pièces" type="number" onChange={handleChange} className={styles.input} />
        <input name="chambre" placeholder="Nombre de chambres" type="number" onChange={handleChange} className={styles.input} />
        <input name="bathrooms" placeholder="Nombre de salles de bain" type="number" onChange={handleChange} className={styles.input} />
        <input name="wc" placeholder="Nombre de WC" type="number" onChange={handleChange} className={styles.input} />

        {/* Caractéristiques */}
        <h2 className={styles.sectionTitle}>Caractéristiques</h2>
        <input name="yearBuilt" placeholder="Année de construction" type="number" onChange={handleChange} className={styles.input} />
        <input name="floor" placeholder="Étage" type="number" onChange={handleChange} className={styles.input} />
        <select name="heatingType" onChange={handleChange} className={styles.input}>
          <option value="">Type de chauffage</option>
          <option value="électrique">Électrique</option>
          <option value="gaz">Gaz</option>
          <option value="bois">Bois</option>
          <option value="pompe à chaleur">Pompe à chaleur</option>
          <option value="autre">Autre</option>
        </select>
        <input name="energyRating" placeholder="Performance énergétique (ex: DPE A, B…)" onChange={handleChange} className={styles.input} />
        <input name="ges" placeholder="GES (ex: A, B, C…)" onChange={handleChange} className={styles.input} />

        {/* Équipements */}
        <h2 className={styles.sectionTitle}>Équipements</h2>
        {['garage','balcon','terrasse','parking','cave','ascenseur','interphone','piscine','jardin','climatisation'].map(eq => (
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
