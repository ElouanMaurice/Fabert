import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/FormulaireAdmin.module.css';

export default function ModifierLocationAnnuelle() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    image: '',
    surface: '',
    rooms: '',
    reference:'',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/locations-annuelles/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/api/locations-annuelles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        surface: Number(formData.surface),
        rooms: Number(formData.rooms),
      }),
    });

    if (res.ok) {
      alert('✅ Location modifiée !');
      router.push('/location-annuelle');
    } else {
      alert('❌ Erreur lors de la modification.');
    }
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
        <h1 className={styles.formTitle}>✏️ Modifier la location</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} name="title" placeholder="Titre" value={formData.title} onChange={handleChange} />
          <input className={styles.input} name="location" placeholder="Emplacement" value={formData.location} onChange={handleChange} />
          <input className={styles.input} name="price" placeholder="Prix" value={formData.price} onChange={handleChange} />
          <input className={styles.input} name="surface" placeholder="Surface" value={formData.surface} onChange={handleChange} />
          <input className={styles.input} name="rooms" placeholder="Pièces" value={formData.rooms} onChange={handleChange} />
          <input className={styles.input} name="image" placeholder="Image" value={formData.image} onChange={handleChange} />
          <input
            className={styles.input}
            name="reference"
            placeholder="reference"
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitButton}>💾 Enregistrer</button>
        </form>
      </div>
    </AdminLayout>
  );
}
