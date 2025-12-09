
# Configuration Locale du Projet

## Prérequis

- Node.js 18+
- PostgreSQL 14+
- Git

## Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd FRAMEWORK_CIRCULAIR
```

### 2. Configuration Backend

```bash
cd backend
npm install
```

### 3. Variables d'environnement

**Créer le fichier `.env` :**
```bash
cp .env.example .env
```

**Éditer `.env` avec vos valeurs :**
- `DATABASE_URL` : votre connexion PostgreSQL
- `JWT_SECRET` : générer avec `openssl rand -base64 32`
- `GEMINI_API_KEY` ou `HUGGINGFACE_API_KEY` : pour le chatbot (optionnel)

### 4. Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# (Optionnel) Seed avec des données de test
npx prisma db seed
```

### 5. Démarrer le backend

```bash
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

### 6. Configuration Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## Variables d'environnement requises

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| DATABASE_URL | Connexion PostgreSQL | ✅ Oui |
| JWT_SECRET | Clé de sécurité JWT | ✅ Oui |
| GEMINI_API_KEY | API Google Gemini | ⚠️ Pour chatbot |
| HUGGINGFACE_API_KEY | API HuggingFace | ⚠️ Pour chatbot |
| GROQ_API_KEY | API Groq | ⚠️ Pour chatbot |

**Note :** Au moins une clé API de chatbot est nécessaire pour activer l'assistant IA.

## Résolution des problèmes

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est démarré
- Vérifiez le `DATABASE_URL` dans `.env`
- Testez la connexion : `psql -U postgres -d iso59000_db`

### Le chatbot ne fonctionne pas
- Vérifiez qu'au moins une clé API est configurée dans `.env`
- Les clés doivent être valides et avoir des crédits

### Erreur Prisma
```bash
npx prisma generate
npx prisma db push --force-reset
```
