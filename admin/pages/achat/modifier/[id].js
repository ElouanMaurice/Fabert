import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/FormulaireAdmin.module.css';

export default function ModifierBien() {
  const [form, setForm] = useState({
    title: '', price: '', location: '', image: '', type: '', reference:'',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          price: data.price || '',
          location: data.location || '',
          image: data.image || '',
          type: data.type || ''
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/achat');
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
        <h1 className={styles.formTitle}>✏️ Modifier le bien</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="location"
            placeholder="Lieu"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="price"
            placeholder="Prix"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="image"
            placeholder="URL image"
            value={form.image}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="type"
            placeholder="Type"
            value={form.type}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="reference"
            placeholder="reference"
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitButton}>Enregistrer les modifications</button>
        </form>
      </div>
    </AdminLayout>
  );
}
