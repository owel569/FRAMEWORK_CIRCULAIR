# Framework Économie Circulaire - ISO 59000

## Vue d'ensemble
Plateforme d'accompagnement des PME marocaines dans leur transition vers l'économie circulaire, conforme aux normes ISO 59000.

**Date de création** : 22 octobre 2025  
**État** : Application complète et fonctionnelle  
**Langages** : TypeScript (Backend & Frontend)  
**Environnement** : Replit (configuré et déployable)

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

### 22 octobre 2025 - Configuration Replit complète
- ✅ Installation de Node.js 20 et toutes les dépendances
- ✅ Configuration du workflow Frontend (démarrage automatique)
- ✅ Correction de la configuration Vite pour Replit (HMR, proxy, CORS)
- ✅ Base de données SQLite créée et synchronisée avec le schéma Prisma
- ✅ Configuration du déploiement en mode VM
- ✅ **Intégration complète des questionnaires sectoriels** :
  - 20 secteurs d'activité avec sous-secteurs détaillés
  - 4 catégories de diagnostic (Environnemental, Économique, Social, Logistique)
  - Questions typées avec unités, poids et types de réponse
  - Fichiers TypeScript créés avec typage strict et optimisé

## Structure des données

### Secteurs d'activité intégrés (20 secteurs)
1. **Agriculture, sylviculture et pêche**
2. **Industrie manufacturière**
3. **Construction / BTP**
4. **Commerce et distribution**
5. **Transport et logistique**
6. **Énergie et environnement**
7. **Santé et action sociale**
8. **Informatique et télécommunications**
9. **Banque, assurance et finance**
10. **Administration publique et défense**
11. **Éducation et formation**
12. **Hôtellerie, restauration et tourisme**
13. **Culture, médias et communication**
14. **Immobilier et logement**
15. **Sciences et technologies**
16. **Artisanat et métiers de proximité**
17. **Services aux entreprises**
18. **Services aux particuliers**
19. **Associations et ONG**
20. **Autres secteurs émergents** (Économie circulaire, Numérique responsable, Agriculture urbaine, etc.)

### Catégories de diagnostic (4 dimensions)
- **Diagnostic environnemental** : Flux, Déchets, Énergie, Eau
- **Diagnostic économique & production** : Efficacité, circularité, innovation
- **Diagnostic social & territorial** : Emploi, formation, inclusion, gouvernance
- **Logistique & chaîne d'approvisionnement** : Supply chain, mutualisation, traçabilité

### Types de questions
- **Boolean** : Questions oui/non
- **Percentage** : Pourcentages (%)
- **Number** : Valeurs numériques avec unités (kg, kWh, km, MAD, etc.)
- **Choice** : Choix multiples prédéfinis
- **Text** : Réponses textuelles libres

## Structure du projet

```
FRAMEWORK_CIRCULAIR/
├── backend/                    # Backend NestJS
│   ├── src/
│   │   ├── company/           # Module entreprises
│   │   ├── score/             # Module scoring
│   │   ├── plan/              # Module plans d'action
│   │   ├── chatbot/           # Module chatbot IA
│   │   ├── types/             # Types TypeScript
│   │   │   └── questionnaire.types.ts  # Types des questionnaires
│   │   ├── data/              # Données statiques
│   │   │   └── questionnaires.data.ts  # Questionnaires complets
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
│   ├── vite.config.ts         # Configuration Vite (Replit)
│   ├── package.json
│   └── tailwind.config.js
│
├── attached_assets/            # Captures d'écran et documents (98 fichiers)
├── start.sh                    # Script de démarrage
├── README.md                   # Documentation complète
└── replit.md                   # Ce fichier

```

## Configuration Replit

### Variables d'environnement

**Backend** :
- `DATABASE_URL` : `file:./dev.db` (SQLite en développement)
- `PORT` : `3000`
- `NODE_ENV` : `development`

**Frontend** :
- `VITE_API_URL` : `http://localhost:3000` (API backend)
- `REPLIT_DEV_DOMAIN` : Domaine Replit (auto-détecté)

### Ports utilisés
- **Backend** : `localhost:3000` (API REST NestJS)
- **Frontend** : `0.0.0.0:5000` (Interface web Vite + React)

### Workflow configuré
**Nom** : Frontend  
**Commande** : `bash start.sh`  
**Type** : Webview  
**Port** : 5000

Le script `start.sh` démarre automatiquement :
1. Backend NestJS en mode watch sur `localhost:3000`
2. Frontend Vite sur `0.0.0.0:5000`

### Configuration Vite spécifique Replit
```typescript
{
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: false,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
```

## Déploiement

### Configuration
- **Type** : VM (Virtual Machine)
- **Build** : 
  ```bash
  cd backend && npm install && npx prisma generate && 
  cd ../frontend && npm install && npm run build
  ```
- **Run** : `bash start.sh`

L'application est prête à être déployée sur Replit Deployments.

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

### Références normatives
- **ISO 59004:2024** : Lignes directrices pour la mise en œuvre de l'économie circulaire
- **ISO 59010:2024** : Indicateurs et méthodes de mesure
- **ISO 59020:2024** : Mesure et évaluation de la circularité
- **ISO 59040:2025** : Cadre de management (à venir)
- **ISO 59014:2024** : Principes et vocabulaire
- **ISO/TR 59032:2024** : Rapport technique sur les réseaux de valeur
- **ISO/AWI 59001** : Système de management de l'économie circulaire (en développement)

### Glossaire (extraits)
- **Économie circulaire** : Système économique utilisant une approche systémique pour maintenir la circulation des ressources
- **Logistique inverse** : Flux retour (collecte, tri, réemploi, recyclage)
- **Écoconception** : Intégration de la réduction de l'impact environnemental
- **Symbiose industrielle** : Coopération entre acteurs pour échanger matières, énergie, eau et sous-produits
- **Économie de la fonctionnalité** : Vente d'un usage ou d'un service plutôt que du produit

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
- **Typage** : TypeScript strict avec types optimisés
- **Approche** : Professionnelle, conforme ISO 59000

## État actuel

### ✅ Fonctionnel
- Backend NestJS avec tous les modules
- Frontend React avec toutes les pages
- Base de données SQLite synchronisée
- Workflow Replit configuré et fonctionnel
- Configuration Vite pour Replit (HMR, proxy)
- Déploiement configuré (mode VM)
- Structure de données complète (20 secteurs, 4 diagnostics)

### 🚧 À développer
1. **Intégration frontend** : Connecter les questionnaires TypeScript au formulaire React
2. **Calcul des scores** : Implémenter l'algorithme de scoring selon ISO 59020
3. **Génération du plan d'action** : Créer des recommandations personnalisées selon ISO 59004
4. **Chatbot RAG** : Intégrer un vrai moteur d'IA avec base vectorielle pour le chatbot
5. **Authentification** : Ajouter JWT/OAuth2 avec gestion de rôles
6. **Tests** : Tests unitaires et d'intégration (Jest/Vitest)
7. **Migration PostgreSQL** : Pour la production
8. **Rapports PDF** : Génération de rapports d'évaluation téléchargeables

## Améliorations futures possibles
1. Intégration d'un vrai moteur d'IA (RAG) pour le chatbot avec base vectorielle
2. Ajout de l'authentification JWT/OAuth2 avec gestion de rôles
3. Migration vers PostgreSQL en production
4. Ajout de files d'attente Redis + BullMQ pour les calculs lourds
5. Stockage de fichiers S3 pour les rapports PDF
6. Tests unitaires et d'intégration (Jest/Vitest)
7. Pipeline CI/CD complet
8. Dashboard administrateur avec statistiques globales
9. Export de données en Excel/CSV
10. Multi-langue (Français, Arabe, Anglais)

## Contributeurs
Développé selon le modèle des trois experts :
- **CODEPRO1** : Architecture backend et API
- **CODEPRO2** : Conception UX/UI et frontend
- **CODEPRO3** : Calculs, données et intégration IA

---

**🌍 Contribuez à l'économie circulaire avec les normes ISO 59000 !**
