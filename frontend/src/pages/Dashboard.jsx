import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/stats/adoptions/').then((res) => setStats(res.data))
  }, [])

  return (
    <div style={styles.container}>
      <h1>Tableau de bord</h1>
      {!stats ? (
        <p>Chargement...</p>
      ) : (
        <div style={styles.grid}>
          <div style={styles.card}>
            <p style={styles.number}>{stats.adoptions_ce_mois}</p>
            <p style={styles.label}>Adoptions ce mois-ci</p>
          </div>
          <div style={styles.card}>
            <p style={styles.number}>{stats.total_adoptions}</p>
            <p style={styles.label}>Total des adoptions</p>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  grid: { display: 'flex', gap: '2rem', marginTop: '2rem' },
  card: {
    flex: 1, padding: '2rem', backgroundColor: 'white',
    borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center',
  },
  number: { fontSize: '3rem', fontWeight: 'bold', color: '#2a9d8f', margin: 0 },
  label: { color: '#666', marginTop: '0.5rem' },
}