import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

const empty = {
  name: '', species: 'chien', breed: '', age: '',
  description: '', status: 'disponible', photo_url: '', adoption_date: '',
}

export default function AnimalForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const isEdit = Boolean(id)

  useEffect(() => {
    if (isEdit) {
      api.get(`/animals/${id}/`).then((res) => setForm(res.data))
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isEdit) {
        await api.put(`/animals/${id}/`, form)
      } else {
        await api.post('/animals/', form)
      }
      navigate('/')
    } catch {
      setError('Une erreur est survenue, vérifie les champs.')
    }
  }

  return (
    <div style={styles.container}>
      <h1>{isEdit ? 'Modifier' : 'Ajouter'} un animal</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nom</label>
        <input name="name" value={form.name} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Espèce</label>
        <select name="species" value={form.species} onChange={handleChange} style={styles.input}>
          <option value="chien">Chien</option>
          <option value="chat">Chat</option>
          <option value="lapin">Lapin</option>
          <option value="autre">Autre</option>
        </select>

        <label style={styles.label}>Race</label>
        <input name="breed" value={form.breed} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Âge (années)</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} required style={styles.input} />

        <label style={styles.label}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} style={{ ...styles.input, height: '80px' }} />

        <label style={styles.label}>Statut</label>
        <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
          <option value="disponible">Disponible</option>
          <option value="adopte">Adopté</option>
          <option value="en_soin">En soin</option>
        </select>

        <label style={styles.label}>Date d'adoption</label>
        <input name="adoption_date" type="date" value={form.adoption_date || ''} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>URL photo</label>
        <input name="photo_url" value={form.photo_url} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>
          {isEdit ? 'Enregistrer' : 'Ajouter'}
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: { padding: '2rem', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontWeight: 'bold', fontSize: '0.9rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  button: {
    marginTop: '1rem', padding: '0.75rem',
    backgroundColor: '#2a9d8f', color: 'white',
    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem',
  },
  error: { color: 'red', marginBottom: '1rem' },
}