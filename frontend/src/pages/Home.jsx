import { useEffect, useState } from 'react'
import api from '../api/axios'
import AnimalCard from '../components/AnimalCard'

export default function Home() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/animals/').then((res) => {
      setAnimals(res.data)
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id))
  }

  if (loading) return <p style={styles.loading}>Chargement...</p>

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nos animaux ({animals.length})</h1>
      {animals.length === 0 ? (
        <p>Aucun animal pour le moment.</p>
      ) : (
        <div style={styles.grid}>
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  title: { marginBottom: '1.5rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  loading: { textAlign: 'center', marginTop: '2rem' },
}