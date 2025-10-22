#!/bin/bash

echo "🚀 Démarrage de l'application Framework Économie Circulaire..."

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "📦 Démarrage du backend NestJS sur localhost:3000..."
cd "$DIR/backend" && npm run start:dev &
BACKEND_PID=$!

echo "🎨 Démarrage du frontend React sur 0.0.0.0:5000..."
cd "$DIR/frontend" && npm run dev &
FRONTEND_PID=$!

echo "✅ Application démarrée!"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:5000"

wait $BACKEND_PID $FRONTEND_PID
