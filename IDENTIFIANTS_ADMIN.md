# 🔐 Identifiants Admin - ISO 59000

## Connexion Administrateur

Pour accéder à l'interface administrateur, utilisez ces identifiants:

### URL de Connexion
```
/admin/login
```

### Identifiants
- **Email**: `admin@iso59000.com`
- **Mot de passe**: `admin123`

---

## ✅ Problèmes Résolus

### 1. Connexion Admin
**Statut**: ✅ **RÉSOLU**
- Base de données initialisée
- Utilisateur admin créé
- Authentication fonctionnelle

### 2. Affichage des Questions par Secteur
**Statut**: ✅ **RÉSOLU**
- **364 questions** importées dans la base de données
- Questions organisées par **20 secteurs d'activité**
- Proxy Vite configuré pour la communication frontend-backend
- Les questions se chargent maintenant correctement

---

## 🎯 Fonctionnalités Admin

Une fois connecté, vous pouvez:

1. **Tableau de Bord**
   - Statistiques globales (nombre d'entreprises, scores, questions)
   - Graphiques de performance par secteur
   - Top 10 des meilleures entreprises
   - Tendances mensuelles

2. **Gestion des Questions**
   - Voir toutes les questions par secteur
   - Ajouter de nouvelles questions
   - Modifier les questions existantes (texte, poids, type, unité)
   - Supprimer des questions
   - Import/Export en masse

3. **Gestion des Entreprises**
   - Rechercher des entreprises
   - Voir les détails et historique des scores
   - Analyser la progression

---

## 📊 Structure de la Base de Données

### Questions par Secteur

| Secteur | Nombre de Questions |
|---------|-------------------|
| Agriculture, sylviculture et pêche | 23 |
| Industrie manufacturière | 31 |
| Construction / BTP | 23 |
| Commerce et distribution | 17 |
| Transport et logistique | 18 |
| Énergie et environnement | 16 |
| Santé et action sociale | 16 |
| Informatique et télécommunications | 16 |
| Banque, assurance et finance | 13 |
| Administration publique et défense | 16 |
| Éducation et formation | 16 |
| Hôtellerie, restauration et tourisme | 28 |
| Culture, médias et communication | 15 |
| Immobilier et logement | 28 |
| Sciences et technologies | 15 |
| Artisanat et métiers de proximité | 16 |
| Services aux entreprises | 15 |
| Services aux particuliers | 14 |
| Associations et ONG | 13 |
| Autres secteurs émergents | 15 |

**Total**: 364 questions

---

## 🔄 Mise à Jour des Questions (Tous les 5 ans)

Vous avez plusieurs options pour mettre à jour les questions:

### Option 1: Interface Web Admin
1. Connectez-vous à `/admin/login`
2. Allez dans la section "Questions"
3. Modifiez, ajoutez ou supprimez des questions individuellement
4. Chaque question a un typage précis:
   - **Type** (boolean, percentage, number, text, choice)
   - **Poids** (importance de la question)
   - **Unité** (%, kg, m³, etc.)
   - **Catégorie** (environnemental, économique, social, logistique)

### Option 2: Import en Masse
1. Exportez les questions actuelles via `/admin/questions/export`
2. Modifiez le fichier JSON
3. Importez via `/admin/questions/bulk-import`

---

## 🚀 Serveurs en Fonctionnement

- **Frontend (React + Vite)**: Port 5000
- **Backend (NestJS)**: Port 3000
- **Base de données**: SQLite (`backend/prisma/dev.db`)

---

## ⚙️ Configuration Technique

### Proxy Vite Configuré
Le frontend et le backend communiquent via un proxy Vite:
- Toutes les requêtes vers `/api/*` sont automatiquement redirigées vers `http://localhost:3000`
- Cela résout les problèmes de CORS et d'exposition des ports dans Replit

### API Backend
Base URL pour les API: `/api`
- `/api/admin/login` - Connexion admin
- `/api/admin/stats` - Statistiques dashboard
- `/api/admin/questions` - Gestion des questions
- `/api/questionnaires/:sector` - Questions par secteur
- `/api/companies` - Gestion des entreprises
- `/api/scores/calculate` - Calcul des scores

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez que le workflow "Frontend" est en cours d'exécution
2. Vérifiez les logs pour les erreurs backend ou frontend
3. La base de données est dans `backend/prisma/dev.db`

---

**Bon travail avec votre plateforme d'évaluation ISO 59000! 🌍♻️**
