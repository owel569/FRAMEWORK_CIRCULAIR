
# 🧮 Documentation Complète - Calcul des Scores & Architecture

## 📊 CALCUL DES SCORES - DÉTAILLÉ

### Vue d'ensemble

Le système de calcul des scores évalue la **circularité** d'une entreprise selon la norme **ISO 59000** sur 4 dimensions principales. Chaque dimension est notée sur **100 points**, et le score global est la **moyenne des 4 dimensions**.

---

## 🎯 ÉTAPE 1 : Collecte des Réponses

### Structure des données d'entrée

```typescript
interface QuestionResponse {
  id: string;        // ID de la question
  value: number;     // Réponse de 1 à 5
}

interface DimensionResponses {
  governance?: QuestionResponse[];      // Questions gouvernance
  economic?: QuestionResponse[];        // Questions économiques
  social?: QuestionResponse[];          // Questions sociales
  environmental?: QuestionResponse[];   // Questions environnementales
}
```

**Échelle de réponse** : Chaque question a une réponse de **1 à 5** :
- **1** = Très insuffisant / Jamais
- **2** = Insuffisant / Rarement
- **3** = Moyen / Parfois
- **4** = Bon / Souvent
- **5** = Excellent / Toujours

---

## 🧮 ÉTAPE 2 : Calcul du Score de Base par Dimension

### Formule de base

Pour chaque dimension (gouvernance, économique, social, environnemental) :

```
Score de base = (Somme des réponses / (Nombre de questions × 5)) × 100
```

### Exemple concret

**Dimension Gouvernance** avec 10 questions :
- Question 1 : 5/5
- Question 2 : 4/5
- Question 3 : 3/5
- Question 4 : 5/5
- Question 5 : 4/5
- Question 6 : 2/5
- Question 7 : 5/5
- Question 8 : 4/5
- Question 9 : 3/5
- Question 10 : 4/5

**Calcul** :
```
Somme = 5 + 4 + 3 + 5 + 4 + 2 + 5 + 4 + 3 + 4 = 39
Score de base = (39 / (10 × 5)) × 100 = (39 / 50) × 100 = 78%
```

### Code source

Voir `backend/src/score/score.service.ts` ligne 158 :

```typescript
private calculateDimensionScore(answers: QuestionResponse[]): number {
  if (!answers || answers.length === 0) {
    return 0;
  }
  
  const total = answers.reduce((sum, answer) => {
    const value = Number(answer.value) || 0;
    return sum + value;
  }, 0);
  
  return Number(((total / (answers.length * 5)) * 100).toFixed(2));
}
```

---

## 💰 ÉTAPE 3 : Bonus Économiques (Dimension Économique)

Le score économique bénéficie de **bonus contextuels** basés sur les données réelles de l'entreprise.

### 3.1 Bonus Valorisation des Déchets (+12 points max)

**Formule** :
```
Bonus = (pourcentageValorisation / 100) × 12
```

**Exemple** :
- Entreprise valorise **80%** de ses déchets
- Bonus = (80 / 100) × 12 = **9.6 points**

### 3.2 Bonus Achats Locaux (+8 points max)

**Formule** :
```
Bonus = (partAchatsLocaux / 100) × 8
```

**Exemple** :
- Entreprise achète **60%** localement
- Bonus = (60 / 100) × 8 = **4.8 points**

### 3.3 Bonus Achats Responsables (+10 points max)

**Formule** :
```
Bonus = (achatsResponsablesPct / 100) × 10
```

### 3.4 Bonus Économie Potentielle (+5 points)

**Condition** : Si `economiePotentielleMad > 0`
- Bonus = **+5 points**

### 3.5 Bonus Taux d'Utilisation Équipements (+8 points max)

**Conditions** :
- Si `tauxUtilisationEqPct >= 80%` → **+8 points**
- Si `tauxUtilisationEqPct >= 60%` → **+5 points**

### 3.6 Bonus Matières Recyclées (+7 points)

**Condition** : Si `matieresRecycleesMad > 0`
- Bonus = **+7 points**

### Exemple complet - Score Économique

**Données entreprise** :
- Score de base (questionnaire) : **65%**
- Valorisation déchets : **75%**
- Achats locaux : **50%**
- Achats responsables : **60%**
- Économie potentielle : **15,000 MAD**
- Taux utilisation équipements : **85%**
- Matières recyclées : **20,000 MAD**

**Calcul des bonus** :
```
Bonus valorisation    = (75 / 100) × 12 = 9.0 points
Bonus achats locaux   = (50 / 100) × 8  = 4.0 points
Bonus achats resp.    = (60 / 100) × 10 = 6.0 points
Bonus économie pot.   = 5.0 points (condition remplie)
Bonus utilisation éq. = 8.0 points (85% >= 80%)
Bonus matières recy.  = 7.0 points (condition remplie)

Total bonus = 9.0 + 4.0 + 6.0 + 5.0 + 8.0 + 7.0 = 39 points
```

**Score économique final** :
```
Score final = min(100, 65 + 39) = min(100, 104) = 100%
```
⚠️ **Plafond** : Le score ne peut jamais dépasser **100%**.

---

## 👥 ÉTAPE 4 : Bonus Sociaux (Dimension Sociale)

### 4.1 Bonus Emplois Locaux (+12 points max)

**Formule** :
```
Bonus = (partEmploisLocauxPct / 100) × 12
```

**Exemple** :
- 70% d'emplois locaux → Bonus = **8.4 points**

### 4.2 Bonus Heures de Formation (+10 points max)

**Conditions** :
- Si `heuresFormationSalarieAn >= 40h` → **+10 points**
- Si `heuresFormationSalarieAn >= 30h` → **+7 points**
- Si `heuresFormationSalarieAn >= 20h` → **+5 points**

### 4.3 Bonus Recrutement (+5 points)

**Condition** : Si `recrutementAn > 0`
- Bonus = **+5 points**

### 4.4 Bonus Parité Femmes/Hommes (+10 points max)

**Conditions** :
- Si `partFemmesPct` entre **40% et 60%** → **+10 points** (parité parfaite)
- Si `partFemmesPct >= 30%` → **+5 points**

---

## 🌍 ÉTAPE 5 : Bonus Environnementaux (Dimension Environnementale)

### 5.1 Bonus Émissions CO₂ par Employé (+15 points max)

**Formule** :
```
emissionsParEmploye = emissionsScope12 / employeeCount
```

**Conditions** :
- Si `emissionsParEmploye < 5 tonnes` → **+15 points**
- Si `emissionsParEmploye < 10 tonnes` → **+10 points**
- Si `emissionsParEmploye < 15 tonnes` → **+5 points**

### 5.2 Bonus Ratio Déchets Dangereux (+10 points)

**Formule** :
```
ratioDechetsDangereux = (dechetsDangereux / dechetsTotaux) × 100
```

**Condition** :
- Si `ratioDechetsDangereux < 5%` → **+10 points**

---

## 🎯 ÉTAPE 6 : Score Global Final

### Formule

```
Score Global = (Gouvernance + Économique + Social + Environnemental) / 4
```

Le score global est la **moyenne arithmétique** des 4 dimensions, arrondie à **2 décimales**.

### Exemple complet

**Scores par dimension** :
- Gouvernance : **78.5%**
- Économique : **92.0%**
- Social : **85.3%**
- Environnemental : **71.2%**

**Score global** :
```
Score Global = (78.5 + 92.0 + 85.3 + 71.2) / 4 = 327 / 4 = 81.75%
```

---

## 🏗️ ARCHITECTURE DU SYSTÈME

### Architecture Globale

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│                      Port 5000                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Home    │  │Question- │  │Dashboard │              │
│  │          │  │  naire   │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP REST (axios)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (NestJS)                       │
│                      Port 3000                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Score Module                           │  │
│  │  • calculateScore()                              │  │
│  │  • calculateDimensionScore()                     │  │
│  │  • calculateEnhancedEconomicScore()             │  │
│  │  • calculateEnhancedSocialScore()               │  │
│  │  • calculateEnhancedEnvironmentalScore()        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │ Prisma ORM
                      ▼
┌─────────────────────────────────────────────────────────┐
│               BASE DE DONNÉES (SQLite)                   │
│                 backend/prisma/dev.db                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Company  │  │  Score   │  │Question  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Flux de Calcul de Score

```
1. Utilisateur remplit questionnaire
   └─> Frontend collecte les réponses

2. Frontend envoie à l'API
   └─> POST /scores/calculate
   
3. ScoreService.calculateScore()
   ├─> Récupère les données entreprise (Prisma)
   ├─> calculateAllScores()
   │   ├─> calculateDimensionScore(governance)
   │   ├─> calculateEnhancedEconomicScore()
   │   ├─> calculateEnhancedSocialScore()
   │   └─> calculateEnhancedEnvironmentalScore()
   └─> Sauvegarde dans base de données

4. Backend retourne le score
   └─> Frontend affiche le dashboard
```

### Modules Backend

#### 1. Score Module (`backend/src/score/`)
- **Responsabilité** : Calcul des scores
- **Fichiers** :
  - `score.service.ts` : Logique de calcul
  - `score.controller.ts` : Routes API
  - `score.module.ts` : Configuration module

#### 2. Company Module (`backend/src/company/`)
- **Responsabilité** : Gestion entreprises
- **API** : `/companies`

#### 3. Plan Module (`backend/src/plan/`)
- **Responsabilité** : Génération plans d'action
- **Logique** : Recommandations ISO 59004

#### 4. Chatbot Module (`backend/src/chatbot/`)
- **Responsabilité** : Assistant intelligent
- **Base** : 120+ entrées de connaissances

#### 5. Admin Module (`backend/src/admin/`)
- **Responsabilité** : Interface admin
- **Fonctionnalités** :
  - Gestion questions
  - Statistiques
  - Mode démo

---

## 📊 Modèle de Données (Prisma Schema)

### Company (Entreprise)

```prisma
model Company {
  id                      String   @id @default(uuid())
  name                    String
  sector                  String
  email                   String   @unique
  employeeCount           Int?
  
  // Données économiques
  pourcentageValorisation Float?
  partAchatsLocaux        Float?
  achatsResponsablesPct   Float?
  economiePotentielleMad  Float?
  tauxUtilisationEqPct    Float?
  matieresRecycleesMad    Float?
  
  // Données sociales
  partEmploisLocauxPct    Float?
  heuresFormationSalarieAn Float?
  recrutementAn           Int?
  partFemmesPct           Float?
  
  // Données environnementales
  emissionsScope12        Float?
  dechetsTotaux           Float?
  dechetsDangereux        Float?
  
  scores                  Score[]
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

### Score

```prisma
model Score {
  id                    String   @id @default(uuid())
  companyId             String
  company               Company  @relation(fields: [companyId], references: [id])
  
  globalScore           Float
  governanceScore       Float
  economicScore         Float
  socialScore           Float
  environmentalScore    Float
  
  responses             String   // JSON des réponses
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

---

## 🔍 Code Source Principal

### Fichier : `backend/src/score/score.service.ts`

**Lignes importantes** :
- **Ligne 35** : `calculateAllScores()` - Orchestration générale
- **Ligne 52** : `calculateEnhancedEconomicScore()` - Bonus économiques
- **Ligne 89** : `calculateEnhancedSocialScore()` - Bonus sociaux
- **Ligne 124** : `calculateEnhancedEnvironmentalScore()` - Bonus environnementaux
- **Ligne 158** : `calculateDimensionScore()` - Score de base

---

## 📈 Exemple Complet de Calcul

### Données d'entrée

**Entreprise** : TechRecycle Solutions
- **Secteur** : Informatique et télécommunications
- **Effectif** : 45 employés

**Réponses questionnaire** :
- Gouvernance : 20 questions, somme = 85/100 → Score base = **85%**
- Économique : 15 questions, somme = 60/75 → Score base = **80%**
- Social : 18 questions, somme = 72/90 → Score base = **80%**
- Environnemental : 16 questions, somme = 56/80 → Score base = **70%**

**Données contextuelles** :
- Valorisation déchets : **90%**
- Achats locaux : **65%**
- Achats responsables : **70%**
- Économie potentielle : **50,000 MAD**
- Taux utilisation équipements : **88%**
- Matières recyclées : **100,000 MAD**
- Emplois locaux : **80%**
- Formation/salarié/an : **45h**
- Recrutement annuel : **3 personnes**
- Part femmes : **48%**
- Émissions CO₂ : **180 tonnes** (4 tonnes/employé)
- Déchets dangereux : **2 tonnes** / Total : **50 tonnes** (4%)

### Calcul des bonus

**Économique** :
```
Score base = 80%
+ Valorisation (90/100 × 12) = +10.8
+ Achats locaux (65/100 × 8) = +5.2
+ Achats resp. (70/100 × 10) = +7.0
+ Économie pot. = +5.0
+ Utilisation éq. (88% >= 80%) = +8.0
+ Matières recyclées = +7.0
Total bonus = 43 points
Score économique = min(100, 80 + 43) = 100%
```

**Social** :
```
Score base = 80%
+ Emplois locaux (80/100 × 12) = +9.6
+ Formation (45h >= 40h) = +10.0
+ Recrutement (3 > 0) = +5.0
+ Parité (48% entre 40-60%) = +10.0
Total bonus = 34.6 points
Score social = min(100, 80 + 34.6) = 100%
```

**Environnemental** :
```
Score base = 70%
+ Émissions (4 t/employé < 5) = +15.0
+ Déchets dangereux (4% < 5%) = +10.0
Total bonus = 25 points
Score environnemental = min(100, 70 + 25) = 95%
```

**Score Global** :
```
(85 + 100 + 100 + 95) / 4 = 380 / 4 = 95%
```

🎯 **Résultat** : TechRecycle Solutions obtient un score de **95/100** - Excellent niveau de circularité !

---

## 🎓 Normes ISO de Référence

- **ISO 59004:2024** : Lignes directrices pour la mise en œuvre de l'économie circulaire
- **ISO 59020:2024** : Mesure et évaluation de la circularité
- **ISO 59010:2024** : Indicateurs et méthodes de mesure
- **ISO 59014:2024** : Principes et vocabulaire

---

**Dernière mise à jour** : 22 octobre 2025  
**Version** : 2.0  
**Auteur** : Framework Économie Circulaire - ISO 59000
