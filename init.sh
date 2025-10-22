#!/bin/bash

echo "🚀 Initialisation complète du projet ISO 59000..."

# 1. Backend - Installation et configuration
echo "📦 Installation backend..."
cd backend
npm install

# 2. Génération Prisma et initialisation DB
echo "🗄️ Configuration de la base de données..."
npx prisma generate
npx prisma migrate deploy

# 3. Peuplement de la base (admin + questions)
echo "🌱 Import des données..."
npx ts-node prisma/seed.ts
npx ts-node prisma/seed-questions.ts

cd ..

# 4. Frontend - Installation
echo "🎨 Installation frontend..."
cd frontend
npm install
cd ..

echo "✅ Initialisation terminée!"
echo ""
echo "Pour démarrer l'application, tapez: bash start.sh"
echo "Ou cliquez sur le bouton Run"
