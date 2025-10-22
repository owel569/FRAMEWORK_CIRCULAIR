
# 🤖 Documentation du Chatbot - Framework Économie Circulaire

## Vue d'ensemble

Le chatbot est un assistant intelligent intégré à la plateforme Framework Économie Circulaire. Il aide les utilisateurs à comprendre les normes ISO 59000, l'économie circulaire et le fonctionnement de la plateforme.

## 🎯 Objectifs du Chatbot

1. **Accompagnement utilisateur** : Répondre aux questions sur ISO 59000
2. **Assistance contextuelle** : Guider les utilisateurs dans leur évaluation
3. **Formation** : Éduquer sur les principes de l'économie circulaire
4. **Support** : Aider à l'utilisation de la plateforme

## 🏗️ Architecture

### Architecture Globale

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│                                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │         ChatbotWidget.tsx                     │  │
│  │                                                │  │
│  │  • Interface utilisateur                      │  │
│  │  • Gestion de l'état (messages, ouverture)   │  │
│  │  • Communication avec l'API                   │  │
│  └────────────────┬──────────────────────────────┘  │
│                   │                                  │
└───────────────────┼──────────────────────────────────┘
                    │
                    │ HTTP POST /chatbot/ask
                    │ { question: string, context?: string }
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│                Backend (NestJS)                      │
│                                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │      ChatbotController                        │  │
│  │                                                │  │
│  │  Route: POST /chatbot/ask                    │  │
│  │  • Reçoit la question                         │  │
│  │  • Délègue au service                         │  │
│  └────────────────┬──────────────────────────────┘  │
│                   │                                  │
│                   ▼                                  │
│  ┌───────────────────────────────────────────────┐  │
│  │      ChatbotService                           │  │
│  │                                                │  │
│  │  • Base de connaissances (knowledgeBase)     │  │
│  │  • Algorithme de matching                     │  │
│  │  • Génération de réponses                     │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Structure des Fichiers

```
FRAMEWORK_CIRCULAIR/
├── frontend/src/components/
│   └── ChatbotWidget.tsx          # Composant UI du chatbot
│
└── backend/src/chatbot/
    ├── chatbot.module.ts          # Module NestJS
    ├── chatbot.controller.ts      # Contrôleur REST API
    └── chatbot.service.ts         # Logique métier
```

## 📋 Composants Détaillés

### 1. Frontend - ChatbotWidget.tsx

**Responsabilités** :
- Affichage de l'interface utilisateur
- Gestion de l'état des messages
- Communication avec l'API backend

**État local** :
```typescript
const [isOpen, setIsOpen] = useState(false)           // Widget ouvert/fermé
const [messages, setMessages] = useState<any[]>([...]) // Historique des messages
const [input, setInput] = useState('')                 // Texte de l'utilisateur
const [loading, setLoading] = useState(false)          // État de chargement
```

**Fonctions principales** :
- `handleSend()` : Envoie la question à l'API et gère la réponse
- Affichage conditionnel du bouton flottant ou de la fenêtre de chat

**Design** :
- Position : fixe en bas à droite
- Couleurs : Bleu circulaire (#91E0EB)
- Taille : 384px × 500px
- Responsive et accessible

### 2. Backend - ChatbotController

**Endpoint** : `POST /chatbot/ask`

**Request Body** :
```typescript
{
  question: string,      // Question de l'utilisateur (requis)
  context?: string       // Contexte optionnel (futur)
}
```

**Response** :
```typescript
{
  question: string,      // Question reçue
  answer: string,        // Réponse générée
  confidence: number,    // Score de confiance (0-1)
  source: string        // Source de la réponse
}
```

### 3. Backend - ChatbotService

**Base de connaissances actuelle** :
```typescript
private knowledgeBase = {
  'ISO 59000': 'La famille de normes ISO 59000 fournit un cadre pour l\'économie circulaire...',
  'ISO 59004': 'ISO 59004:2024 - Lignes directrices pour la mise en œuvre...',
  'ISO 59020': 'ISO 59020:2024 - Mesure et évaluation de la circularité...',
  'économie circulaire': 'L\'économie circulaire vise à minimiser les déchets...',
}
```

**Algorithme de matching** :
1. Conversion de la question en minuscules
2. Recherche de mots-clés dans `knowledgeBase`
3. Si match trouvé → Réponse avec confiance 0.9
4. Sinon → Réponse par défaut avec confiance 0.5

## 🔄 Flux de Données

### Scénario : Utilisateur pose une question

```
1. Utilisateur tape "Qu'est-ce que ISO 59004 ?"
   └─> ChatbotWidget capture l'input

2. ChatbotWidget.handleSend()
   └─> POST /chatbot/ask { question: "Qu'est-ce que ISO 59004 ?" }

3. ChatbotController.ask()
   └─> Délègue à ChatbotService.askQuestion()

4. ChatbotService.askQuestion()
   ├─> Convertit en lowercase: "qu'est-ce que iso 59004 ?"
   ├─> Trouve match avec clé "ISO 59004"
   └─> Retourne { answer: "ISO 59004:2024 - Lignes directrices...", confidence: 0.9 }

5. ChatbotController
   └─> Retourne la réponse en JSON

6. ChatbotWidget
   ├─> Reçoit la réponse
   ├─> Ajoute le message au tableau messages[]
   └─> Affiche la réponse dans l'interface
```

## 📊 État Actuel vs État Futur

### ✅ Implémentation Actuelle

| Fonctionnalité | État | Description |
|----------------|------|-------------|
| Interface UI | ✅ | Widget flottant fonctionnel |
| API REST | ✅ | Endpoint /chatbot/ask opérationnel |
| Base de connaissances | ✅ | 4 entrées statiques |
| Matching simple | ✅ | Recherche par mots-clés |
| Historique session | ✅ | Messages conservés pendant la session |

### 🚧 Évolutions Futures

| Fonctionnalité | Priorité | Description |
|----------------|----------|-------------|
| **RAG (Retrieval Augmented Generation)** | Haute | Intégration d'un moteur d'IA avec base vectorielle |
| **Base vectorielle** | Haute | Pinecone/Milvus pour stocker les documents ISO |
| **LLM Integration** | Haute | OpenAI GPT-4 ou Anthropic Claude |
| **Context awareness** | Moyenne | Utiliser le contexte de l'utilisateur (score, secteur) |
| **Multi-langue** | Moyenne | Support FR, AR, EN |
| **Analytics** | Faible | Suivi des questions fréquentes |

## 🔧 Configuration

### Variables d'environnement (futures)

```env
# Backend .env
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1
CHATBOT_MODEL=gpt-4-turbo
```

### Limites actuelles

- **Pas de persistance** : Les conversations ne sont pas sauvegardées
- **Base limitée** : Seulement 4 entrées de connaissances
- **Pas d'apprentissage** : Réponses fixes, pas d'amélioration continue
- **Pas de contexte** : Ne prend pas en compte le profil de l'entreprise

## 🚀 Roadmap d'Amélioration

### Phase 1 : Enrichissement de la base (Court terme)
1. Ajouter 50+ questions/réponses sur ISO 59000
2. Inclure des exemples sectoriels
3. Ajouter des ressources et liens

### Phase 2 : Intelligence Artificielle (Moyen terme)
1. Intégrer OpenAI API
2. Créer une base vectorielle avec Pinecone
3. Implémenter le RAG pattern
4. Ajouter l'analyse de sentiment

### Phase 3 : Contextualisation (Long terme)
1. Utiliser le profil entreprise pour personnaliser
2. Recommandations basées sur le score
3. Suivi des questions par utilisateur
4. Dashboard analytics pour les admins

## 💡 Exemples d'Utilisation

### Questions supportées actuellement

```
✅ "Qu'est-ce que ISO 59000 ?"
✅ "Parle-moi de ISO 59004"
✅ "C'est quoi l'économie circulaire ?"
✅ "Comment fonctionne ISO 59020 ?"
```

### Questions à supporter (futur)

```
🔜 "Quelles sont les recommandations pour mon secteur ?"
🔜 "Comment améliorer mon score de gouvernance ?"
🔜 "Quels sont les indicateurs ISO 59010 pertinents pour moi ?"
🔜 "Donne-moi un exemple de symbiose industrielle"
```

## 🔐 Sécurité

### Mesures actuelles
- ✅ Validation des inputs
- ✅ CORS configuré
- ✅ Pas de stockage de données sensibles

### À implémenter
- 🔜 Rate limiting (max 10 questions/minute)
- 🔜 Sanitization avancée des inputs
- 🔜 Authentification pour les requêtes
- 🔜 Logs des conversations (RGPD compliant)

## 📚 Références Techniques

### Technologies utilisées
- **Frontend** : React 18, TypeScript, Axios, Tailwind CSS
- **Backend** : NestJS 10, TypeScript
- **Architecture** : REST API, Service-oriented

### Dépendances futures
```json
{
  "openai": "^4.0.0",
  "@pinecone-database/pinecone": "^2.0.0",
  "langchain": "^0.1.0"
}
```

## 🐛 Debug et Maintenance

### Logs
Les logs du chatbot sont disponibles dans la console backend :
```bash
[ChatbotService] Question received: "..."
[ChatbotService] Match found: ISO 59004
[ChatbotService] Response sent with confidence: 0.9
```

### Tests
```bash
# Tester l'endpoint
curl -X POST http://localhost:3000/chatbot/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Qu'est-ce que ISO 59000 ?"}'
```

## 🤝 Contribution

Pour améliorer le chatbot :
1. Ajouter des entrées dans `knowledgeBase` (backend/src/chatbot/chatbot.service.ts)
2. Améliorer l'algorithme de matching
3. Ajouter des tests unitaires
4. Proposer des évolutions d'architecture

---

**Dernière mise à jour** : 22 octobre 2025  
**Version** : 1.0.0 (Base statique)  
**Contact** : Framework Économie Circulaire - ISO 59000
