import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isLogin) {
        await login(form.username, form.password)
      } else {
        await register(form.username, form.email, form.password)
        await login(form.username, form.password)
      }
      navigate('/')
    } catch {
      setError(isLogin ? 'Identifiants incorrects.' : 'Erreur lors de la création du compte.')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🐾 Nova Refuge</h1>
        <div style={styles.tabs}>
          <button onClick={() => setIsLogin(true)} style={isLogin ? styles.tabActive : styles.tab}>
            Connexion
          </button>
          <button onClick={() => setIsLogin(false)} style={!isLogin ? styles.tabActive : styles.tab}>
            Inscription
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="username" placeholder="Nom d'utilisateur" value={form.username}
            onChange={handleChange} required style={styles.input} />
          {!isLogin && (
            <input name="email" type="email" placeholder="Email" value={form.email}
              onChange={handleChange} style={styles.input} />
          )}
          <input name="password" type="password" placeholder="Mot de passe" value={form.password}
            onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px',
  },
  title: { textAlign: 'center', marginBottom: '1.5rem' },
  tabs: { display: 'flex', marginBottom: '1.5rem', borderBottom: '2px solid #eee' },
  tab: {
    flex: 1, padding: '0.75rem', border: 'none',
    backgroundColor: 'transparent', cursor: 'pointer', color: '#666',
  },
  tabActive: {
    flex: 1, padding: '0.75rem', border: 'none',
    backgroundColor: 'transparent', cursor: 'pointer',
    color: '#2a9d8f', borderBottom: '2px solid #2a9d8f', fontWeight: 'bold',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' },
  button: {
    padding: '0.75rem', backgroundColor: '#2a9d8f',
    color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem',
  },
  error: { color: 'red', fontSize: '0.9rem', marginBottom: '0.5rem' },
}