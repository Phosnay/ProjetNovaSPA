import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🐾 Nova Refuge</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/" style={styles.link}>Animaux</Link>
            <Link to="/animals/new" style={styles.link}>Ajouter</Link>
            <Link to="/dashboard" style={styles.link}>Tableau de bord</Link>
            <button onClick={handleLogout} style={styles.button}>Déconnexion</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Connexion</Link>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  links: { display: 'flex', gap: '1rem', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none' },
  button: {
    background: '#e63946',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}