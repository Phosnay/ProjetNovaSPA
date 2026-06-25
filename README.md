#SuperUser :
username: root
mail: root@mail.com
password: root1234

# 🐾 Nova Refuge — Application de gestion d'un refuge animalier

![Django](https://img.shields.io/badge/Django-4.2-green)
![React](https://img.shields.io/badge/React-18-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

Application web full-stack permettant de gérer un refuge animalier fictif : suivi des animaux, gestion des adoptions, statistiques mensuelles et gestion des comptes utilisateurs.

> Projet réalisé dans le cadre de la certification **CDA (Concepteur Développeur d'Applications)** — Handigital 2025-2026.

---

## Sommaire

- [Aperçu des fonctionnalités](#aperçu-des-fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Commandes utiles](#commandes-utiles)
- [Lancer les tests](#lancer-les-tests)
- [Endpoints API](#endpoints-api)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement](#déploiement)
- [Auteur](#auteur)

---

## Aperçu des fonctionnalités

- 📋 Consulter la liste des animaux du refuge avec leur statut
- ➕ Ajouter, modifier et supprimer une fiche animal
- 📊 Tableau de bord avec les statistiques d'adoptions (mois en cours + total)
- 👤 Création de compte utilisateur et connexion sécurisée
- 🔐 Toutes les pages sont protégées — accès réservé aux utilisateurs connectés
- 📖 Documentation API automatique via Swagger

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 + Vite, React Router, Axios |
| Backend | Django 4.2, Django REST Framework |
| Authentification | JWT (djangorestframework-simplejwt) |
| Base de données | PostgreSQL 15 |
| Containerisation | Docker + Docker Compose |
| Documentation API | drf-spectacular (Swagger) |

---

## Architecture du projet

```
ProjetNovaSPA/
├── backend/
│   ├── config/                 # Configuration Django (settings, urls, wsgi)
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/                   # App principale
│   │   ├── models.py           # Modèle Animal
│   │   ├── serializers.py      # Sérialisation JSON ↔ Python
│   │   ├── views.py            # Logique des endpoints
│   │   ├── urls.py             # Routes de l'app core
│   │   ├── admin.py            # Interface d'administration
│   │   └── tests.py            # Tests unitaires (11 tests)
│   ├── requirements.txt        # Dépendances Python
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Configuration Axios + gestion JWT
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Barre de navigation
│   │   │   ├── AnimalCard.jsx  # Carte d'un animal
│   │   │   └── PrivateRoute.jsx# Protection des routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Contexte global d'authentification
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Page d'accueil — liste des animaux
│   │   │   ├── AnimalForm.jsx  # Formulaire création / modification
│   │   │   ├── Dashboard.jsx   # Tableau de bord — statistiques
│   │   │   └── Auth.jsx        # Connexion / Inscription
│   │   └── App.jsx             # Routing principal
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé :

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (inclut Docker Compose)
- [Node.js 18+](https://nodejs.org/) et npm
- [Python 3.11+](https://www.python.org/)
- [Git](https://git-scm.com/)

Vérifie tes versions avec :

```bash
docker --version
docker compose version
node --version
python --version
```

---

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/Phosnay/ProjetNovaSPA.git
cd ProjetNovaSPA
```

### 2. Configurer les variables d'environnement

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Ouvre `backend/.env` et remplis les valeurs, notamment `SECRET_KEY`.
Tu peux en générer une avec la commande suivante une fois Docker lancé :

```bash
docker-compose exec backend python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 3. Construire et lancer les containers Docker

```bash
docker-compose up --build
```

Cette commande lance les trois services simultanément :
- **db** — PostgreSQL sur le port 5432
- **backend** — Django sur le port 8000
- **frontend** — React sur le port 5173

> Pour lancer en arrière-plan (sans bloquer le terminal) :
> ```bash
> docker-compose up -d
> ```

### 4. Initialiser la base de données

Dans un nouveau terminal, lance les migrations :

```bash
docker-compose exec backend python manage.py migrate
```

### 5. Créer un compte administrateur

```bash
docker-compose exec backend python manage.py createsuperuser
```

Suis les instructions pour choisir un nom d'utilisateur, un email et un mot de passe.

### 6. Accéder à l'application

| Service | URL |
|---|---|
| 🌐 Application React | http://localhost:5173 |
| ⚙️ API Django | http://localhost:8000 |
| 🔧 Interface d'administration | http://localhost:8000/admin |
| 📖 Documentation API (Swagger) | http://localhost:8000/api/docs |

---

## Commandes utiles

### Docker

```bash
# Lancer les services en arrière-plan
docker-compose up -d

# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (repart de zéro)
docker-compose down -v

# Reconstruire les images après un changement de dépendances
docker-compose up --build

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un seul service
docker-compose logs -f backend
```

### Django

```bash
# Créer les fichiers de migration après modification d'un modèle
docker-compose exec backend python manage.py makemigrations

# Appliquer les migrations
docker-compose exec backend python manage.py migrate

# Ouvrir un shell Python Django
docker-compose exec backend python manage.py shell

# Créer un superutilisateur
docker-compose exec backend python manage.py createsuperuser
```

### Base de données

```bash
# Accéder au shell PostgreSQL
docker-compose exec db psql -U refuge_user -d refuge_db
```

---

## Lancer les tests

Les tests couvrent les modèles, les endpoints API et l'authentification.

```bash
docker-compose exec backend python manage.py test core
```

Résultat attendu :

```
Found 11 test(s).
...........
----------------------------------------------------------------------
Ran 11 tests in X.XXXs

OK
```

### Ce qui est testé

| Test | Description |
|---|---|
| `test_animal_creation` | Création d'un animal avec les bons champs |
| `test_animal_str` | Représentation string du modèle |
| `test_default_status` | Statut par défaut à "disponible" |
| `test_get_animals_list` | Récupération de la liste des animaux |
| `test_create_animal` | Création d'un animal via l'API |
| `test_delete_animal` | Suppression d'un animal |
| `test_unauthenticated_access` | Accès refusé sans token JWT |
| `test_adoption_stats` | Endpoint des statistiques d'adoption |
| `test_register` | Création d'un compte utilisateur |
| `test_login` | Connexion et réception du token JWT |
| `test_login_wrong_password` | Refus d'un mauvais mot de passe |

---

## Endpoints API

L'API complète est documentée et testable sur `http://localhost:8000/api/docs/`

### Authentification

| Méthode | Endpoint | Description | Auth requise |
|---|---|---|---|
| POST | `/api/auth/register/` | Créer un compte | Non |
| POST | `/api/auth/login/` | Se connecter, obtenir un JWT | Non |
| POST | `/api/auth/refresh/` | Rafraîchir le token d'accès | Non |

### Animaux

| Méthode | Endpoint | Description | Auth requise |
|---|---|---|---|
| GET | `/api/animals/` | Liste de tous les animaux | ✅ Oui |
| POST | `/api/animals/` | Créer un animal | ✅ Oui |
| GET | `/api/animals/{id}/` | Détail d'un animal | ✅ Oui |
| PUT | `/api/animals/{id}/` | Modifier un animal | ✅ Oui |
| DELETE | `/api/animals/{id}/` | Supprimer un animal | ✅ Oui |

### Statistiques

| Méthode | Endpoint | Description | Auth requise |
|---|---|---|---|
| GET | `/api/stats/adoptions/` | Adoptions du mois + total | ✅ Oui |

### Exemple de réponse — `GET /api/animals/`

```json
[
  {
    "id": 1,
    "name": "Rex",
    "species": "chien",
    "breed": "Labrador",
    "age": 3,
    "description": "Très joueur et affectueux.",
    "status": "disponible",
    "photo_url": "",
    "adoption_date": null,
    "created_at": "2026-06-01T10:00:00Z",
    "updated_at": "2026-06-01T10:00:00Z"
  }
]
```

### Exemple de réponse — `GET /api/stats/adoptions/`

```json
{
  "adoptions_ce_mois": 3,
  "total_adoptions": 12
}
```

---

## Variables d'environnement

### `backend/.env`

```env
SECRET_KEY=ta-clé-secrète-générée
DEBUG=True
POSTGRES_DB=refuge_db
POSTGRES_USER=refuge_user
POSTGRES_PASSWORD=refuge_pass
POSTGRES_HOST=db
POSTGRES_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173
```
### `frontend/.env`

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Déploiement

> Architecture de déploiement prévue si j'avais un peu plus de temps :

| Service | Plateforme | Rôle |
|---|---|---|
| Frontend React | [Vercel](https://vercel.com) | Déploiement automatique via GitHub |
| Backend Django | [Render](https://render.com) | Hébergement de l'API Python |
| Base de données | [Neon](https://neon.tech) | PostgreSQL serverless cloud |

### Étapes prévues

**1. Neon — Base de données**

Créer un projet sur Neon, récupérer l'URL de connexion et la renseigner dans les variables d'environnement de Render sous la forme :
```
DATABASE_URL=postgres://user:password@host/dbname
```

**2. Render — Backend Django**

Connecter le dépôt GitHub sur Render, configurer le service Python, renseigner toutes les variables d'environnement (`SECRET_KEY`, `DATABASE_URL`, `DEBUG=False`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`) et définir la commande de démarrage :
```bash
python manage.py migrate && gunicorn config.wsgi:application
```

**3. Vercel — Frontend React**

Connecter le dépôt GitHub sur Vercel, définir le dossier racine sur `frontend/`, et renseigner la variable d'environnement `VITE_API_URL` avec l'URL publique de Render.

---

## Auteur

GitHub : [@Phosnay](https://github.com/Phosnay)