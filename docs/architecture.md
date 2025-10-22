# Architecture de l'Application Framework Économie Circulaire

## Vue d'ensemble

Cette application suit une architecture client-serveur moderne avec séparation claire entre le backend (API REST) et le frontend (SPA React).

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                     (React + Vite)                           │
│                      Port 5000                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │Question- │  │Dashboard │  │  Action  │   │
│  │          │  │  naire   │  │          │  │   Plan   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  Components:                                                 │
│  • ChatbotWidget  • DashboardRadar  • ProgressBar          │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/REST
                   ├── axios
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│                      (NestJS)                                │
│                      Port 3000                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Company  │  │  Score   │  │   Plan   │  │ Chatbot  │   │
│  │ Module   │  │  Module  │  │  Module  │  │  Module  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┘   │
│       │             │              │                         │
│       └─────────────┴──────────────┘                         │
│                     │                                        │
│              ┌──────▼──────┐                                │
│              │   Prisma    │                                │
│              │   Service   │                                │
│              └──────┬──────┘                                │
└─────────────────────┼────────────────────────────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   SQLite     │
              │  Database    │
              └──────────────┘
```

## Backend (NestJS)

### Modules

#### 1. Company Module
**Responsabilité** : Gestion des entreprises

**Endpoints** :
- `POST /companies` : Créer une entreprise
- `GET /companies` : Liste des entreprises
- `GET /companies/:id` : Détails d'une entreprise

**Modèle de données** :
```typescript
Company {
  id: string (UUID)
  name: string
  sector: string
  email: string (unique)
  phone?: string
  scores: Score[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### 2. Score Module
**Responsabilité** : Calcul des scores de circularité

**Endpoints** :
- `POST /scores/calculate` : Calculer le score
- `GET /scores/company/:companyId` : Scores d'une entreprise
- `GET /scores/:id` : Détails d'un score

**Algorithme de calcul** :
```typescript
Score par dimension = (Σ réponses / (nombre de questions × 5)) × 100
Score global = Moyenne des 4 dimensions
```

**Dimensions évaluées** :
1. Gouvernance (ISO 59004)
2. Économique (ISO 59020)
3. Social
4. Environnemental

#### 3. Plan Module
**Responsabilité** : Génération de plans d'action

**Logique** :
- Analyse du score global et par dimension
- Génération de recommandations ciblées
- Priorisation selon la maturité
- Timeline adaptée au score

**Recommandations** :
- Score < 40% → Priorité Critique (6 mois)
- Score 40-60% → Priorité Haute (12 mois)
- Score 60-80% → Priorité Moyenne (18 mois)
- Score > 80% → Priorité Faible (24 mois)

#### 4. Chatbot Module
**Responsabilité** : Assistant intelligent ISO 59000

**Base de connaissances** :
- Normes ISO 59000, 59004, 59020
- Principes d'économie circulaire
- Fonctionnement de la plateforme

**À venir** :
- Intégration RAG (Retrieval Augmented Generation)
- Base vectorielle (Pinecone/Milvus)
- Modèle de langage (OpenAI/Anthropic)

## Frontend (React)

### Pages

#### 1. Home (`/`)
**Objectif** : Présentation de la plateforme

**Éléments** :
- Hero section avec CTA principal
- Cartes de fonctionnalités
- Bénéfices de l'économie circulaire
- Footer informatif

#### 2. QuestionnaireForm (`/questionnaire`)
**Objectif** : Collecte des données d'évaluation

**Flow** :
1. Informations entreprise (nom, secteur, email, téléphone)
2. Dimension Gouvernance (3 questions)
3. Dimension Économique (3 questions)
4. Dimension Social (3 questions)
5. Dimension Environnemental (3 questions)
6. Soumission et calcul

**Échelle** : 1 à 5 (Pas du tout → Totalement)

#### 3. ScoreDashboard (`/dashboard/:scoreId`)
**Objectif** : Visualisation des résultats

**Composants** :
- Score global (grand chiffre avec niveau)
- Graphique radar (4 dimensions)
- Barres de progression par dimension
- Lien vers le plan d'action

#### 4. ActionPlan (`/plan/:scoreId`)
**Objectif** : Recommandations personnalisées

**Sections** :
- Résumé du score et priorité
- Liste des recommandations détaillées
- Références ISO spécifiques
- Ressources complémentaires
- Téléchargement PDF (à venir)

### Composants réutilisables

#### ChatbotWidget
Widget de chat flottant en bas à droite avec :
- Ouverture/fermeture
- Historique des messages
- Intégration API chatbot

#### DashboardRadar
Graphique radar Recharts pour les 4 dimensions.

#### ProgressBar
Barre de progression colorée avec animation.

## Base de données

### Schéma Prisma

```prisma
model Company {
  id        String   @id @default(uuid())
  name      String
  sector    String
  email     String   @unique
  phone     String?
  scores    Score[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Score {
  id              String   @id @default(uuid())
  companyId       String
  company         Company  @relation(...)
  globalScore     Float
  governanceScore Float
  economicScore   Float
  socialScore     Float
  responses       String   # JSON sérialisé
  actionPlan      ActionPlan?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ActionPlan {
  id              String   @id @default(uuid())
  scoreId         String   @unique
  score           Score    @relation(...)
  recommendations String   # JSON sérialisé
  priority        String
  timeline        String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model SectorAverage {
  id        String @id @default(uuid())
  sector    String @unique
  avgScore  Float
}
```

## Flux de données

### Flux d'évaluation complet

```
1. User → Frontend: Remplit questionnaire
2. Frontend → Backend: POST /companies (create company)
3. Backend → DB: INSERT company
4. Backend → Frontend: Return company.id
5. Frontend → Backend: POST /scores/calculate
6. Backend: Calculate scores (4 dimensions + global)
7. Backend → DB: INSERT score
8. Backend: Generate action plan
9. Backend → DB: INSERT action plan
10. Backend → Frontend: Return score.id
11. Frontend: Redirect to /dashboard/:scoreId
12. Frontend → Backend: GET /scores/:scoreId
13. Backend → DB: SELECT score with company and plan
14. Backend → Frontend: Return complete data
15. Frontend: Display dashboard
```

## Sécurité (à implémenter)

### Authentification
- JWT tokens
- OAuth2 (optionnel)
- Roles: Admin, Consultant, Entreprise

### Validation
- class-validator sur tous les DTOs
- Sanitization des inputs
- Rate limiting sur les endpoints

### CORS
- Configuré pour accepter les requêtes du frontend
- En production: whitelist des domaines

## Performance

### Backend
- Connexion DB pooling (Prisma)
- Calculs asynchrones
- Cache potentiel (Redis à venir)

### Frontend
- Code splitting (Vite)
- Lazy loading des routes
- Optimisation des images
- Memoization React

## Déploiement

### Mode VM (actuel)
- Build: Compilation backend + frontend
- Run: Script start.sh lance les deux services
- Backend: localhost:3000
- Frontend: 0.0.0.0:5000

### Production (recommandations)
- Backend: Service séparé (PM2/Docker)
- Frontend: Build statique sur CDN
- Database: PostgreSQL managé
- Monitoring: Logs + métriques

## Tests (à développer)

### Backend
- Tests unitaires (Jest)
- Tests d'intégration des modules
- Tests E2E des endpoints

### Frontend
- Tests unitaires des composants (Vitest)
- Tests d'intégration (React Testing Library)
- Tests E2E (Playwright/Cypress)

## Évolutions futures

1. **Performance**
   - Cache Redis
   - Files d'attente BullMQ
   - Optimisation requêtes DB

2. **Fonctionnalités**
   - Authentification complète
   - Export PDF avancé
   - Comparaison sectorielle
   - Suivi temporel

3. **IA**
   - RAG pour chatbot
   - Recommandations ML
   - Analyse prédictive

4. **Infrastructure**
   - Migration PostgreSQL
   - Stockage S3
   - CDN pour assets
   - Monitoring Sentry/DataDog
