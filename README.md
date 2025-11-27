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
- Clé API HuggingFace (voir section Configuration ci-dessous)

### Première Installation

```bash
# Initialisation complète du projet
bash init.sh
```

### Démarrage rapide

```bash
# Démarrer l'application (backend + frontend)
bash start.sh
```

Le backend sera disponible sur `http://localhost:3000`  
Le frontend sera disponible sur `http://localhost:5000`

### Installation manuelle (optionnel)

#### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

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

**IMPORTANT** : Pour le chatbot, vous devez configurer votre clé API HuggingFace.

#### Sur Replit (Recommandé)

1. Ouvrez l'outil **Secrets** dans la barre latérale gauche
2. Cliquez sur "Create new secret"
3. Ajoutez :
   - **Key** : `HUGGINGFACE_API_KEY`
   - **Value** : Votre clé API HuggingFace (obtenue sur https://huggingface.co/settings/tokens)
4. Cliquez sur "Add new secret"

#### En local (fichier `.env`)

Créez un fichier `backend/.env` avec :

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
HUGGINGFACE_API_KEY=votre_clé_api_ici
```

**⚠️ Ne jamais commit le fichier `.env` !** Il est déjà dans `.gitignore`.

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

## ❓ FAQ - Questions fréquentes

### Comment obtenir une clé API HuggingFace ?

1. Créez un compte gratuit sur https://huggingface.co
2. Allez dans Settings → Access Tokens : https://huggingface.co/settings/tokens
3. Cliquez sur "Create new token"
4. Donnez un nom (ex: "ISO59000-Project")
5. Sélectionnez "Read" comme type
6. Copiez la clé générée

### Comment configurer la clé API sur un nouvel espace Replit ?

**Sur Replit, utilisez TOUJOURS l'outil Secrets** au lieu de créer un fichier `.env` :

1. Ouvrez votre Repl
2. Dans la barre latérale gauche, cliquez sur l'icône **🔒 Secrets** (cadenas)
3. Ajoutez la clé `HUGGINGFACE_API_KEY` avec votre token
4. Redémarrez l'application avec `bash start.sh`

Les secrets Replit sont :
- ✅ Sécurisés (non visibles dans le code)
- ✅ Automatiquement injectés comme variables d'environnement
- ✅ Non partagés dans le fork/clone du projet

### Le chatbot ne fonctionne pas

Vérifiez que :
1. La clé API HuggingFace est bien configurée dans Secrets
2. Le backend démarre sans l'erreur `HUGGINGFACE_API_KEY manquante`
3. Vous avez redémarré l'application après avoir ajouté la clé

## 👥 Contributeurs

Développé par les experts CODEPRO :
- **CODEPRO1** - Architecture backend et API
- **CODEPRO2** - Conception UX/UI et frontend
- **CODEPRO3** - Calculs, données et intégration IA

## 📄 Licence

MIT

---

**🌍 Contribuez à l'économie circulaire !**
