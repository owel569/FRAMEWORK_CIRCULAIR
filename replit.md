# EIGSI Circular Lab - Plateforme ISO 59000

## Vue d'ensemble
Application web d'évaluation de la maturité en économie circulaire selon la norme ISO 59000, développée pour les entreprises marocaines.

## Architecture technique

### Backend (NestJS)
- **Framework**: NestJS avec TypeScript
- **Base de données**: PostgreSQL (Prisma ORM)
- **Port**: 3000
- **Modules principaux**:
  - `AdminModule`: Gestion des administrateurs, statistiques, questions, entreprises
  - `AuthModule`: Authentification JWT
  - `ScoreModule`: Calcul et gestion des scores
  - `QuestionnaireModule`: Gestion des questionnaires d'évaluation
  - `ChatbotModule`: Assistant IA (Gemini/HuggingFace)
  - `TeamModule`: Gestion de l'équipe

### Frontend (React/Vite)
- **Framework**: React 18 avec TypeScript
- **Build**: Vite
- **Port**: 5000
- **UI**: TailwindCSS, Shadcn/UI components
- **État**: React Query pour la gestion des données

## Structure des fichiers

```
backend/
├── src/
│   ├── admin/          # Module admin (DTOs, services, controller)
│   ├── auth/           # Authentification
│   ├── score/          # Calcul des scores
│   ├── chatbot/        # Assistant IA
│   ├── questionnaire/  # Gestion des questions
│   └── prisma.service.ts
├── prisma/
│   └── schema.prisma   # Schéma de la base de données
└── package.json

frontend/
├── src/
│   ├── components/     # Composants React
│   ├── pages/          # Pages de l'application
│   ├── hooks/          # Custom hooks
│   └── styles/         # CSS/TailwindCSS
└── package.json
```

## Modèles de données principaux

### Company
- id, name, sector, size, location, contact, createdAt

### Score
- id, companyId, overallScore, governanceScore, economicScore, socialScore, environmentalScore
- maturityLevel, recommendations

### Question
- id, text, dimension, category, questionType, weight, isoReference

### AdminUser
- id, email, password, firstName, lastName, role (SUPER_ADMIN, ADMIN, EXPERT)

## Dimensions d'évaluation ISO 59000

1. **Gouvernance** - Stratégie et politique d'économie circulaire
2. **Économique** - Modèle d'affaires et performance économique
3. **Social** - Impact social et engagement des parties prenantes
4. **Environnemental** - Performance environnementale et gestion des ressources

## Niveaux de maturité

- Niveau 1: Initiation (0-20)
- Niveau 2: Développement (21-40)
- Niveau 3: Standardisation (41-60)
- Niveau 4: Optimisation (61-80)
- Niveau 5: Excellence (81-100)

## Scripts de démarrage

```bash
# Démarrer l'application complète
./start.sh

# Backend uniquement
cd backend && npm run start:dev

# Frontend uniquement
cd frontend && npm run dev
```

## Compte administrateur par défaut

- **Email**: admin@iso59000.com
- **Mot de passe**: Admin@123

## Changements récents (Décembre 2025)

- Migration de SQLite vers PostgreSQL
- Correction de 36+ erreurs TypeScript
- Uniformisation des noms de champs (globalScore → overallScore)
- Mise à jour des DTOs admin pour correspondre au schéma Prisma
- Suppression des références aux champs Company inexistants

## Notes de développement

- Le champ `size` de Company utilise des valeurs comme "small", "medium", "large" 
- Le service comparative-score.service.ts convertit ces valeurs en nombres d'employés estimés
- L'interface est entièrement en français
