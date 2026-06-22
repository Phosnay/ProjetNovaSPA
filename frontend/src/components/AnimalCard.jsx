import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function AnimalCard({ animal, onDelete }) {
  const navigate = useNavigate()

  const statusColor = {
    disponible: '#2a9d8f',
    adopte: '#e76f51',
    en_soin: '#e9c46a',
  }

  const handleDelete = async () => {
    if (window.confirm(`Supprimer ${animal.name} ?`)) {
      await api.delete(`/animals/${animal.id}/`)
      onDelete(animal.id)
    }
  }

  return (
    <div style={styles.card}>
      <div style={{ ...styles.status, backgroundColor: statusColor[animal.status] }}>
        {animal.status.replace('_', ' ')}
      </div>
      <h3 style={styles.name}>{animal.name}</h3>
      <p style={styles.info}>{animal.species} • {animal.age} ans</p>
      {animal.breed && <p style={styles.info}>{animal.breed}</p>}
      <p style={styles.description}>{animal.description}</p>
      <div style={styles.actions}>
        <button onClick={() => navigate(`/animals/${animal.id}`)} style={styles.btnEdit}>
          Modifier
        </button>
        <button onClick={handleDelete} style={styles.btnDelete}>
          Supprimer
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  status: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
  },
  name: { margin: '0 0 0.5rem', fontSize: '1.2rem' },
  info: { margin: '0.2rem 0', color: '#666', fontSize: '0.9rem' },
  description: { margin: '0.5rem 0', fontSize: '0.9rem', color: '#444' },
  actions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  btnEdit: {
    flex: 1, padding: '0.4rem', backgroundColor: '#457b9d',
    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
  btnDelete: {
    flex: 1, padding: '0.4rem', backgroundColor: '#e63946',
    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
}