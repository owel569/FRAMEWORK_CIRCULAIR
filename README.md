# 🌍 Framework Économie Circulaire - ISO 59000

Plateforme d'accompagnement des PME marocaines dans leur transition vers l'économie circulaire, conforme aux normes ISO 59000.

## 🎯 Objectif du projet

Application web complète qui sert de plateforme d'accompagnement à la mise en œuvre de l'économie circulaire dans les secteurs des PME marocain, conformément à la famille de normes ISO 59000.

## ✨ Fonctionnalités

- 📊 **Questionnaire interactif** - Évaluation complète du niveau de maturité en économie circulaire
- 🎯 **Scoring automatique** - Calcul de scores globaux et par dimension (Gouvernance, Économique, Social, Environnemental)
- 📋 **Plan d'action personnalisé** - Recommandations ISO 59000 adaptées au profil de l'entreprise
- 🤖 **Chatbot intelligent** - Assistant pour répondre aux questions sur ISO 59000
- 📈 **Tableaux de bord visuels** - Graphiques radar et barres de progression
- 🎨 **Design moderne** - Interface ergonomique avec les couleurs Vert #A3EB9F et Bleu #91E0EB

## 🏗️ Architecture

### Backend (NestJS + Prisma)
- **API REST** complète avec validation des données
- **Base de données SQLite** (développement) / PostgreSQL (production)
- **Modules** : Company, Score, Plan, Chatbot
- **Calcul automatique** des scores selon méthodologie ISO 59000

### Frontend (React + Vite + Tailwind)
- **Pages** : Home, Questionnaire, Dashboard, Action Plan
- **Composants réutilisables** : ChatbotWidget, DashboardRadar, ProgressBar
- **Routing** avec React Router
- **Graphiques** avec Recharts

## 🚀 Installation et démarrage

### Prérequis
- Node.js 20+
- npm ou yarn

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

Le backend sera disponible sur `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera disponible sur `http://localhost:5000`

## 📊 Stack Technique

### Backend
- **Framework** : NestJS (TypeScript)
- **ORM** : Prisma
- **Base de données** : SQLite (dev) / PostgreSQL (prod)
- **Validation** : class-validator, class-transformer

### Frontend
- **Framework** : React 18 + TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router v6
- **Graphiques** : Recharts
- **HTTP** : Axios

## 📁 Structure du projet

```
FRAMEWORK_CIRCULAIR/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── company/        # Gestion des entreprises
│   │   ├── score/          # Calcul des scores
│   │   ├── plan/           # Génération des plans d'action
│   │   ├── chatbot/        # Assistant IA
│   │   └── common/         # Utilitaires partagés
│   └── prisma/
│       └── schema.prisma   # Schéma de base de données
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── styles/        # CSS Tailwind
│   │   └── App.tsx        # Composant racine
│   └── vite.config.ts     # Configuration Vite
│
└── docs/                  # Documentation
```

## 🔧 Configuration

### Variables d'environnement Backend

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

### Configuration Frontend

Vite est configuré pour servir sur `0.0.0.0:5000` avec support HMR.

Variables d'environnement frontend (fichier `frontend/.env`) :
- `VITE_API_URL` : URL de l'API backend (http://localhost:3000 en développement)

## 📖 API Documentation

### Endpoints principaux

#### Companies
- `POST /companies` - Créer une entreprise
- `GET /companies` - Lister toutes les entreprises
- `GET /companies/:id` - Obtenir une entreprise

#### Scores
- `POST /scores/calculate` - Calculer le score d'une entreprise
- `GET /scores/company/:companyId` - Scores d'une entreprise
- `GET /scores/:id` - Détails d'un score

#### Chatbot
- `POST /chatbot/ask` - Poser une question à l'assistant

## 🎨 Design System

### Couleurs principales
- **Vert circulaire** : #A3EB9F (circular-green)
- **Bleu circulaire** : #91E0EB (circular-blue)
- **Variantes foncées** : #7BC977 (green-dark), #6BC5D4 (blue-dark)

### Composants UI
- `.btn-primary` - Boutons principaux (bleu)
- `.btn-secondary` - Boutons secondaires (vert)
- `.card` - Cartes avec ombres et bordures

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📚 Normes ISO 59000 implémentées

- **ISO 59004:2024** - Lignes directrices pour la mise en œuvre
- **ISO 59020:2024** - Mesure et évaluation de la circularité

## 👥 Contributeurs

Développé par les experts CODEPRO :
- **CODEPRO1** - Architecture backend et API
- **CODEPRO2** - Conception UX/UI et frontend
- **CODEPRO3** - Calculs, données et intégration IA

## 📄 Licence

MIT

---

**🌍 Contribuez à l'économie circulaire !**
