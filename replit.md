# Framework Économie Circulaire - ISO 59000

## Vue d'ensemble
Plateforme d'accompagnement des PME marocaines dans leur transition vers l'économie circulaire, conforme aux normes ISO 59000.

**Date de création** : 22 octobre 2025  
**État** : Application complète et fonctionnelle  
**Langages** : TypeScript (Backend & Frontend)

## Objectif du projet
Application web qui sert de plateforme d'accompagnement à la mise en œuvre de l'économie circulaire dans les secteurs des PME marocaines, conformément à la famille de normes ISO 59000.

### Fonctionnalités principales
- 📊 **Questionnaire interactif** : Évaluation complète du niveau de maturité en économie circulaire
- 🎯 **Scoring automatique** : Calcul de scores globaux et par dimension (Gouvernance, Économique, Social, Environnemental)
- 📋 **Plan d'action personnalisé** : Recommandations ISO 59000 adaptées au profil de l'entreprise
- 🤖 **Chatbot intelligent** : Assistant pour répondre aux questions sur ISO 59000
- 📈 **Tableaux de bord visuels** : Graphiques radar et barres de progression
- 🎨 **Design moderne** : Interface ergonomique avec les couleurs Vert #A3EB9F et Bleu #91E0EB

## Architecture technique

### Stack Backend
- **Framework** : NestJS 10 (TypeScript)
- **ORM** : Prisma 5
- **Base de données** : SQLite (dev) / PostgreSQL (production)
- **Validation** : class-validator, class-transformer
- **API** : REST avec routes documentées

### Stack Frontend
- **Framework** : React 18 + TypeScript
- **Build** : Vite 5
- **Styling** : Tailwind CSS 3
- **Routing** : React Router v6
- **Graphiques** : Recharts 2
- **HTTP** : Axios

### Modules Backend
1. **Company Module** : Gestion des entreprises et profils
2. **Score Module** : Calcul des scores de circularité selon ISO 59000
3. **Plan Module** : Génération automatique de plans d'action ISO 59004/59020
4. **Chatbot Module** : Assistant intelligent avec base de connaissances ISO

### Pages Frontend
1. **Home** : Page d'accueil avec présentation de la plateforme
2. **Questionnaire** : Formulaire multi-étapes avec 4 dimensions (Gouvernance, Économique, Social, Environnemental)
3. **Dashboard** : Visualisation des scores avec graphiques radar et barres
4. **Action Plan** : Recommandations personnalisées et feuille de route

## Modifications récentes

### 22 octobre 2025
- ✅ Installation complète de Node.js 20 et dépendances
- ✅ Création de la structure complète backend (NestJS + Prisma)
- ✅ Création de la structure complète frontend (React + Vite + Tailwind)
- ✅ Configuration de la base de données SQLite avec schéma Prisma
- ✅ Implémentation de tous les modules backend (Company, Score, Plan, Chatbot)
- ✅ Implémentation de toutes les pages frontend (Home, Questionnaire, Dashboard, ActionPlan)
- ✅ Intégration des couleurs de marque (Vert #A3EB9F, Bleu #91E0EB)
- ✅ Configuration du workflow de développement (backend + frontend)
- ✅ Tests et validation de l'application complète
- ✅ Configuration du déploiement (VM mode)
- ✅ **Corrections critiques** :
  - Ajout de la colonne `environmentalScore` dans le schéma Prisma (4 dimensions ISO 59000)
  - Configuration du backend pour écouter sur `0.0.0.0` (accessibilité Replit)
  - Configuration de l'API URL via variable d'environnement frontend (`VITE_API_URL`)
  - Affichage de la dimension environnementale dans le dashboard

## Structure du projet

```
FRAMEWORK_CIRCULAIR/
├── backend/                    # Backend NestJS
│   ├── src/
│   │   ├── company/           # Module entreprises
│   │   ├── score/             # Module scoring
│   │   ├── plan/              # Module plans d'action
│   │   ├── chatbot/           # Module chatbot IA
│   │   ├── common/            # Utilitaires partagés
│   │   ├── app.module.ts      # Module racine
│   │   ├── main.ts            # Point d'entrée
│   │   └── prisma.service.ts  # Service DB
│   ├── prisma/
│   │   └── schema.prisma      # Schéma de données
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Frontend React
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── ChatbotWidget.tsx
│   │   │   ├── DashboardRadar.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── Home.tsx
│   │   │   ├── QuestionnaireForm.tsx
│   │   │   ├── ScoreDashboard.tsx
│   │   │   ├── ActionPlan.tsx
│   │   │   └── NotFound.tsx
│   │   ├── styles/
│   │   │   └── index.css      # Styles Tailwind
│   │   ├── App.tsx            # Composant racine
│   │   └── main.tsx           # Point d'entrée
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── start.sh                    # Script de démarrage
├── README.md                   # Documentation complète
└── replit.md                   # Ce fichier

```

## Configuration

### Variables d'environnement

**Backend** (fichier `backend/.env`) :
- `DATABASE_URL` : Connexion à la base de données
- `PORT` : Port du backend (3000)
- `NODE_ENV` : Environnement (development/production)

**Frontend** (fichier `frontend/.env`) :
- `VITE_API_URL` : URL de l'API backend (http://localhost:3000 en développement)

### Ports utilisés
- **Backend** : `localhost:3000` (API REST)
- **Frontend** : `0.0.0.0:5000` (Interface web)

## Démarrage de l'application

### Développement
L'application démarre automatiquement via le workflow configuré :
```bash
bash start.sh
```

Ce script lance :
1. Le backend NestJS sur `localhost:3000`
2. Le frontend Vite sur `0.0.0.0:5000`

### Production
L'application est configurée pour le déploiement en mode VM :
- Build : Compilation du backend et frontend
- Run : Exécution via `start.sh`

## API Endpoints

### Companies
- `POST /companies` : Créer une entreprise
- `GET /companies` : Lister toutes les entreprises
- `GET /companies/:id` : Obtenir une entreprise

### Scores
- `POST /scores/calculate` : Calculer le score d'une entreprise
- `GET /scores/company/:companyId` : Scores d'une entreprise
- `GET /scores/:id` : Détails d'un score

### Chatbot
- `POST /chatbot/ask` : Poser une question à l'assistant

## Normes ISO implémentées
- **ISO 59004:2024** : Lignes directrices pour la mise en œuvre de l'économie circulaire
- **ISO 59020:2024** : Mesure et évaluation de la circularité

## Design System

### Couleurs principales
- **circular-green** : `#A3EB9F` (vert circulaire)
- **circular-blue** : `#91E0EB` (bleu circulaire)
- **circular-green-dark** : `#7BC977`
- **circular-blue-dark** : `#6BC5D4`

### Classes Tailwind personnalisées
- `.btn-primary` : Boutons principaux (bleu)
- `.btn-secondary` : Boutons secondaires (vert)
- `.card` : Cartes avec ombres et bordures

## Préférences utilisateur
- **Langue** : Français
- **Design** : Interface moderne avec couleurs circulaires (vert/bleu)
- **Architecture** : Séparation backend/frontend claire
- **Approche** : 35% conception, 65% implémentation (CODEPRO1, CODEPRO2, CODEPRO3)

## Améliorations futures possibles
1. Intégration d'un vrai moteur d'IA (RAG) pour le chatbot avec base vectorielle
2. Ajout de l'authentification JWT/OAuth2 avec gestion de rôles
3. Migration vers PostgreSQL en production
4. Ajout de files d'attente Redis + BullMQ pour les calculs lourds
5. Stockage de fichiers S3 pour les rapports PDF
6. Tests unitaires et d'intégration (Jest/Vitest)
7. Pipeline CI/CD complet

## Contributeurs
Développé selon le modèle des trois experts :
- **CODEPRO1** : Architecture backend et API
- **CODEPRO2** : Conception UX/UI et frontend
- **CODEPRO3** : Calculs, données et intégration IA
