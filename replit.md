# Framework Économie Circulaire - ISO 59000

## Vue d'ensemble
Plateforme d'accompagnement des PME marocaines dans leur transition vers l'économie circulaire, conforme aux normes ISO 59000.

**Date de création** : 22 octobre 2025  
**État** : Application complète et fonctionnelle avec questionnaires sectoriels intégrés 
**Langages** : TypeScript (Backend & Frontend)

## Objectif du projet
Application web qui sert de plateforme d'accompagnement à la mise en œuvre de l'économie circulaire dans les secteurs des PME marocaines, conformément à la famille de normes ISO 59000.

### Fonctionnalités principales
- 📊 **Questionnaire interactif sectoriel** : Évaluation complète du niveau de maturité en économie circulaire avec 20 secteurs d'activité
- 🎯 **Scoring automatique** : Calcul de scores globaux et par dimension (Gouvernance, Économique, Social, Environnemental)
- 📋 **Plan d'action personnalisé** : Recommandations ISO 59000 adaptées au profil de l'entreprise
- 🤖 **Chatbot intelligent** : Assistant pour répondre aux questions sur ISO 59000
- 📈 **Tableaux de bord visuels** : Graphiques radar et barres de progression
- 🎨 **Design moderne** : Interface ergonomique avec les couleurs Vert #A3EB9F et Bleu #91E0EB

## Architecture technique

### Stack Backend
- **Framework** : NestJS 10 (TypeScript)
- **ORM** : Prisma 5
- **Base de données** : SQLite (développement) / PostgreSQL (production recommandé)
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
5. **Types Module** : Système de types TypeScript pour les questionnaires sectoriels
6. **Data Module** : Base de données complète des questionnaires par secteur

### Pages Frontend
1. **Home** : Page d'accueil avec présentation de la plateforme
2. **Questionnaire** : Formulaire multi-étapes avec 4 dimensions (Gouvernance, Économique, Social, Environnemental)
3. **Dashboard** : Visualisation des scores avec graphiques radar et barres
4. **Action Plan** : Recommandations personnalisées et feuille de route

## Secteurs d'activité couverts

L'application intègre **20 secteurs d'activité** avec questionnaires spécifiques :

1. **Agriculture, sylviculture et pêche** - 4 sous-secteurs
2. **Industrie manufacturière** - 7 sous-secteurs (Agroalimentaire, Textile, Chimie, Métallurgie, Électronique, Automobile, Aéronautique)
3. **Construction / BTP** - 4 sous-secteurs
4. **Commerce et distribution** - 4 sous-secteurs
5. **Transport et logistique** - 5 sous-secteurs
6. **Énergie et environnement** - 5 sous-secteurs
7. **Santé et action sociale** - 6 sous-secteurs
8. **Informatique et télécommunications** - 7 sous-secteurs
9. **Banque, assurance et finance** - 8 sous-secteurs
10. **Administration publique et défense** - 9 sous-secteurs
11. **Éducation et formation** - 7 sous-secteurs
12. **Hôtellerie, restauration et tourisme** - 8 sous-secteurs
13. **Culture, médias et communication** - 9 sous-secteurs
14. **Immobilier et logement** - 7 sous-secteurs
15. **Sciences et technologies** - 7 sous-secteurs
16. **Artisanat et métiers de proximité** - 11 sous-secteurs
17. **Services aux entreprises** - 6 sous-secteurs
18. **Services aux particuliers** - 7 sous-secteurs
19. **Associations et ONG** - 7 sous-secteurs
20. **Autres secteurs émergents** - 6 sous-secteurs (Économie circulaire, Numérique responsable, Agriculture urbaine, etc.)

### Catégories de diagnostic par secteur

Chaque secteur est évalué selon **4 catégories** :

1. **Diagnostic environnemental** (Flux, Déchets, Énergie, Eau)
   - Gestion des ressources naturelles
   - Émissions et pollution
   - Énergies renouvelables
   - Économie de l'eau

2. **Diagnostic économique & production**
   - Modèles d'affaires circulaires
   - Efficience et productivité
   - Écoconception
   - Valorisation des sous-produits

3. **Diagnostic social & territorial**
   - Emplois locaux et formation
   - Conditions de travail
   - Égalité et inclusion
   - Ancrage territorial

4. **Logistique & chaîne d'approvisionnement**
   - Approvisionnements responsables
   - Transport bas-carbone
   - Mutualisation logistique
   - Traçabilité et retours

## Modifications récentes

### 22 octobre 2025
- ✅ **Configuration Replit complète**
  - Installation de Node.js 20 et dépendances
  - Configuration de la base de données SQLite avec Prisma
  - Workflow configuré pour démarrage automatique (backend + frontend)
  - Déploiement configuré en mode VM

- ✅ **Structure de données TypeScript avancée**
  - Création du système de types pour les questionnaires sectoriels (`questionnaire.types.ts`)
  - Énumérations pour 20 secteurs et 4 catégories de diagnostic
  - Interface Question avec typage précis (boolean, percentage, number, text, choice)
  - Mapping complet de 120+ sous-secteurs

- ✅ **Base de données de questionnaires complète**
  - Intégration de tous les questionnaires sectoriels (`questionnaires.data.ts`)
  - Plus de 400 questions spécifiques réparties sur 20 secteurs
  - Pondération personnalisée par question (weight)
  - Unités de mesure adaptées (%, MAD, kWh, km, tCO₂e, etc.)

- ✅ **Corrections techniques**
  - Synchronisation du schéma Prisma avec la base de données (`prisma db push`)
  - Configuration du backend sur `0.0.0.0:3000` (accessibilité)
  - Configuration du frontend sur `0.0.0.0:5000` avec proxy Replit
  - Variables d'environnement frontend configurées

- ✅ **Tests et validation**
  - Backend API fonctionnel (GET /companies retourne [])
  - Frontend accessible et responsive
  - Couleurs circulaires (Vert #A3EB9F, Bleu #91E0EB) appliquées

## Structure du projet

```
FRAMEWORK_CIRCULAIR/
├── backend/                    # Backend NestJS
│   ├── src/
│   │   ├── company/           # Module entreprises
│   │   ├── score/             # Module scoring ISO 59000
│   │   ├── plan/              # Module plans d'action
│   │   ├── chatbot/           # Module chatbot IA
│   │   ├── types/             # Types TypeScript (questionnaires)
│   │   │   └── questionnaire.types.ts
│   │   ├── data/              # Données des questionnaires
│   │   │   └── questionnaires.data.ts
│   │   ├── app.module.ts      # Module racine
│   │   ├── main.ts            # Point d'entrée
│   │   └── prisma.service.ts  # Service DB
│   ├── prisma/
│   │   ├── schema.prisma      # Schéma de données
│   │   └── dev.db             # Base SQLite (dev)
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
│   │   ├── config.ts          # Configuration API
│   │   └── main.tsx           # Point d'entrée
│   ├── .env                   # Variables d'environnement
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── docs/                      # Documentation
│   └── architecture.md
├── start.sh                   # Script de démarrage
├── README.md                  # Documentation utilisateur
└── replit.md                  # Ce fichier (documentation technique)
```

## Configuration

### Variables d'environnement

**Backend** (fichier `backend/.env` optionnel) :
- `DATABASE_URL` : Connexion à la base de données (défaut: file:./dev.db)
- `PORT` : Port du backend (défaut: 3000)
- `NODE_ENV` : Environnement (development/production)

**Frontend** (fichier `frontend/.env`) :
- `VITE_API_URL` : URL de l'API backend (http://localhost:3000 en développement)

### Ports utilisés
- **Backend** : `localhost:3000` (API REST, accès interne)
- **Frontend** : `0.0.0.0:5000` (Interface web, accès public via Replit)

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
- **Build** : Compilation du backend et frontend
- **Run** : Exécution via `start.sh`

## API Endpoints

### Companies
- `POST /companies` : Créer une entreprise avec données sectorielles
- `GET /companies` : Lister toutes les entreprises
- `GET /companies/:id` : Obtenir une entreprise et ses scores

### Scores
- `POST /scores/calculate` : Calculer le score d'une entreprise (4 dimensions)
- `GET /scores/company/:companyId` : Historique des scores d'une entreprise
- `GET /scores/:id` : Détails d'un score spécifique

### Chatbot
- `POST /chatbot/ask` : Poser une question à l'assistant ISO 59000

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

## Données intégrées

### Questions par secteur
Chaque secteur dispose d'un questionnaire complet avec :
- **15-25 questions** spécifiques au secteur
- **Pondération** personnalisée (weight: 1-3)
- **Types variés** : boolean, percentage, number, text, choice
- **Unités de mesure** : %, MAD, kWh/m², km, tCO₂e/an, heures/an, etc.
- **Références ISO** : Liens avec les normes ISO 59000

### Exemple de question (Industrie manufacturière)
```typescript
{
  id: 'ind_env_1',
  category: DiagnosticCategory.ENVIRONMENTAL,
  text: 'Taux de matières premières recyclées/réemployées dans la production ?',
  type: 'percentage',
  weight: 3,
  unit: '%'
}
```

## Préférences utilisateur
- **Langue** : Français
- **Design** : Interface moderne avec couleurs circulaires (vert/bleu)
- **Architecture** : Séparation backend/frontend claire avec typage TypeScript fort
- **Approche** : Orientée données authentiques avec questionnaires sectoriels exhaustifs

## Améliorations futures possibles

### Court terme
1. **Intégration frontend-backend des questionnaires sectoriels**
   - Endpoint API pour récupérer les questionnaires par secteur
   - Formulaire dynamique basé sur le secteur sélectionné
   - Validation des réponses côté backend

2. **Calcul des scores sectorisés**
   - Algorithme de scoring basé sur les poids des questions
   - Comparaison avec moyennes sectorielles
   - Benchmarking inter-entreprises

3. **Plans d'action personnalisés par secteur**
   - Recommandations ISO adaptées au score
   - Priorités basées sur les faiblesses identifiées
   - Feuille de route avec timeline

### Moyen terme
4. **Authentification et gestion des utilisateurs**
   - JWT/OAuth2 avec rôles (Entreprise, Consultant, Admin)
   - Tableau de bord multi-entreprises pour consultants
   
5. **Migration PostgreSQL en production**
   - Meilleure performance
   - Support des transactions complexes
   
6. **Chatbot avec RAG (Retrieval-Augmented Generation)**
   - Base vectorielle des normes ISO 59000
   - Réponses contextuelles et précises

### Long terme
7. **Stockage S3 pour rapports PDF**
8. **Files d'attente Redis + BullMQ** pour les calculs lourds
9. **Tests unitaires et d'intégration** (Jest/Vitest)
10. **Pipeline CI/CD complet**
11. **API publique documentée** (Swagger/OpenAPI)

## Contributeurs
Développé selon le modèle des trois experts :
- **CODEPRO1** : Architecture backend et API
- **CODEPRO2** : Conception UX/UI et frontend
- **CODEPRO3** : Calculs, données et intégration des questionnaires sectoriels
