#SuperUser :
username: root
mail: root@mail.com
password: root1234

# 🐾 Nova Refuge — SPA Refuge Animalier

Application web de gestion d'un refuge animalier fictif, permettant de gérer les animaux, les adoptions et les utilisateurs.

## Stack technique

- **Frontend** : React + Vite (JavaScript)
- **Backend** : Django + Django REST Framework
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Token)
- **Déploiement** : Vercel (frontend) + Render (backend) + Neon (PostgreSQL)
- **Environnement local** : Docker + Docker Compose

## Fonctionnalités

- Consulter la liste des animaux du refuge
- Ajouter / modifier / supprimer un animal
- Voir les statistiques d'adoptions (ce mois-ci + total)
- Créer un compte utilisateur
- Connexion / déconnexion sécurisée via JWT

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 18+](https://nodejs.org/)
- [Python 3.11+](https://www.python.org/)

## Installation et lancement en local

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/ton-repo.git
cd ton-repo
```

### 2. Configurer les variables d'environnement

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Remplis `backend/.env` avec tes valeurs (notamment `SECRET_KEY`).

### 3. Lancer Docker

```bash
docker-compose up --build
```

### 4. Initialiser la base de données

```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

### 5. Accéder à l'application

| Service | URL |
|---|---|
| Frontend React | http://localhost:5173 |
| API Django | http://localhost:8000 |
| Admin Django | http://localhost:8000/admin |
| Documentation API | http://localhost:8000/api/docs |

## Lancer les tests

```bash
docker-compose exec backend python manage.py test core
```

## Structure du projet