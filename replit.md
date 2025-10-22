# Plateforme d'Évaluation ISO 59000 - Économie Circulaire

## 📋 Vue d'ensemble

Application complète pour l'évaluation des entreprises selon les normes ISO 59000 d'économie circulaire. Destinée aux PME marocaines pour leur transition vers l'économie circulaire.

## 🏗️ Architecture

### Backend (NestJS)
- **Port**: 3000
- **Database**: SQLite (Prisma ORM)
- **API REST**: Questionnaires, Scores, Admin, Chatbot
- **Location**: `backend/`

### Frontend (React + Vite + TypeScript)
- **Port**: 5000
- **UI**: React Router, Tailwind CSS, Recharts
- **Location**: `frontend/`

### Proxy Configuration
Le frontend et backend communiquent via un proxy Vite configuré qui redirige `/api` vers `localhost:3000`.

## 🔐 Accès Admin

**URL**: `/admin/login`
- **Email**: `admin@iso59000.com`
- **Mot de passe**: `admin123`

## 📊 Base de Données

### Tables Principales
- **Company**: Informations des entreprises
- **Score**: Scores d'évaluation
- **ActionPlan**: Plans d'action personnalisés
- **QuestionnaireQuestion**: 364 questions pour 20 secteurs
- **AdminUser**: Utilisateurs administrateurs
- **SectorAverage**: Moyennes par secteur

### Questions par Secteur
- 20 secteurs d'activité couverts
- 364 questions au total
- 4 catégories: Environnemental, Économique, Social, Logistique

## 🚀 Démarrage

Le script `start.sh` démarre automatiquement:
1. Backend NestJS sur port 3000
2. Frontend React sur port 5000

## 🛠️ Fonctionnalités

### Interface Publique
- Formulaire d'évaluation multi-étapes
- Questionnaires dynamiques par secteur
- Calcul automatique des scores (0-100)
- Dashboard radar avec 5 dimensions
- Plan d'action personnalisé
- Chatbot assistant

### Interface Admin (`/admin`)
- Dashboard avec KPIs et graphiques
- Gestion complète des questions
- Recherche et filtrage des entreprises
- Import/Export de questions
- Statistiques par secteur
- Top performers

## 📝 Gestion des Questions

Les questions peuvent être mises à jour via:
1. **Interface Admin**: Modification individuelle avec typage précis
2. **API Bulk Import**: Import en masse via JSON
3. **Direct DB**: Modification de `backend/prisma/dev.db`

### Types de Questions
- `boolean`: Oui/Non
- `percentage`: Valeur en %
- `number`: Valeur numérique
- `choice`: Choix multiples
- `text`: Texte libre

Chaque question a:
- **Poids**: Importance (1-3)
- **Unité**: %, kg, m³, etc.
- **Catégorie**: environnemental/économique/social/logistique
- **Secteur**: Agriculture, Industrie, etc.

## 🔄 Workflow de Mise à Jour (Tous les 5 ans)

1. Se connecter à l'admin
2. Exporter les questions actuelles
3. Modifier selon les nouvelles normes ISO
4. Importer les questions mises à jour
5. Tester sur un échantillon d'entreprises

## 📦 Dépendances

### Backend
- NestJS, Prisma, bcrypt, jsonwebtoken
- SQLite pour la base de données

### Frontend  
- React 18, React Router, Axios
- Recharts pour les graphiques
- Tailwind CSS pour le style

## 🗂️ Structure des Fichiers

```
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   ├── dev.db (SQLite)
│   │   ├── seed.ts
│   │   └── seed-questions.ts
│   └── src/
│       ├── admin/
│       ├── chatbot/
│       ├── company/
│       ├── questionnaire/
│       ├── score/
│       └── data/questionnaires.data.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── config.ts
│       └── styles/
├── start.sh
├── IDENTIFIANTS_ADMIN.md
└── replit.md
```

## 🔧 Configuration Technique

### Proxy Vite
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### CORS Backend
```typescript
app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

## 📈 Calcul des Scores

Les scores sont calculés selon:
1. **Gouvernance**: Compliance ISO, certifications
2. **Économie**: Efficacité, circularité, innovation
3. **Social**: Emploi, formation, inclusion
4. **Environnement**: Déchets, énergie, eau, émissions
5. **Global**: Moyenne pondérée des 4 dimensions

## 🎯 Prochaines Améliorations Possibles

- Authentification des entreprises
- Export PDF des rapports
- Benchmarking sectoriel avancé
- Recommandations IA personnalisées
- API publique pour intégrations

## 📞 Support Technique

En cas de problème:
1. Vérifier que le workflow "Frontend" est actif
2. Consulter les logs backend/frontend
3. Vérifier la base de données dans `backend/prisma/dev.db`

## 🎭 Mode Démonstration Admin (NOUVEAU)

Pour présenter la plateforme avec des données réalistes:

1. Connectez-vous à `/admin/login`
2. Cliquez sur le bouton **"📊 Données Réelles"** en haut à droite
3. Le bouton devient **"🎭 Mode Démo"** (violet)
4. Les graphiques affichent maintenant 156 entreprises et 423 évaluations fictives
5. Recliquez pour revenir aux données réelles

**Données de démonstration incluses:**
- 156 entreprises réparties sur 14 secteurs
- 423 scores d'évaluation
- Tendances sur 12 mois
- Top 10 des meilleures entreprises
- Statistiques sectorielles complètes

## 🤖 Chatbot Enrichi (NOUVEAU)

La base de connaissance du chatbot a été enrichie avec **40+ nouvelles entrées**:

**Nouveaux thèmes couverts:**
- Concepts avancés (ACV, Cradle to Cradle, économie bleue, régénérative)
- Pratiques concrètes (upcycling, réparation, consigne, méthanisation, compostage)
- Technologies (blockchain, IA, IoT, jumeaux numériques)
- Réglementation (REP, DPP, taxonomie verte)
- Environnement spécifique Maroc (empreinte eau, stress hydrique)

**Questions supplémentaires couvertes:**
- "C'est quoi le cradle to cradle ?"
- "Comment fonctionne la méthanisation ?"
- "Qu'est-ce que l'empreinte eau ?"
- "Comment la blockchain aide l'économie circulaire ?"
- "C'est quoi le greenwashing ?"
- Et bien plus...

## 📄 Fichiers de Documentation

- `IDENTIFIANTS_ADMIN.md`: Identifiants et guide admin
- `AMELIORATIONS_OCTOBRE_2025.md`: Détails des dernières améliorations
- `SETUP_COMPLETE.md`: Détails de l'installation
- `replit.md`: Ce fichier (overview du projet)

---

**Version**: 1.1.0  
**Date**: Octobre 2025  
**Framework**: ISO 59000, ISO 59004, ISO 59010, ISO 59020  
**Dernières améliorations**: Mode démo admin + Chatbot enrichi
