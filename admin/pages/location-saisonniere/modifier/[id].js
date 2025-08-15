import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/FormulaireAdmin.module.css';

export default function ModifierLocationSaisonniere() {
  const [form, setForm] = useState({
    title: '', location: '', price: '', image: '', surface: '', rooms: '', description: '', reference:'',

  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          location: data.location || '',
          price: data.price || '',
          image: data.image || '',
          surface: data.surface || '',
          rooms: data.rooms || '',
          description: data.description || '',
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations-saisonnieres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/location-saisonniere');
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
        <h1 className={styles.formTitle}>Modifier une location saisonnière</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="title" value={form.title} onChange={handleChange} required className={styles.input} />
          <input name="location" value={form.location} onChange={handleChange} required className={styles.input} />
          <input name="price" value={form.price} type="number" onChange={handleChange} required className={styles.input} />
          <input name="image" value={form.image} onChange={handleChange} className={styles.input} />
          <input name="surface" value={form.surface} type="number" onChange={handleChange} className={styles.input} />
          <input name="rooms" value={form.rooms} type="number" onChange={handleChange} className={styles.input} />
          <textarea name="description" value={form.description} onChange={handleChange} className={styles.textarea}></textarea>
          <input
            className={styles.input}
            name="reference"
            placeholder="reference"
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitButton}>Enregistrer</button>
        </form>
      </div>
    </AdminLayout>
  );
}
