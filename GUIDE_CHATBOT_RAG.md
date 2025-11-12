
# 🤖 Guide Complet du Chatbot RAG - Architecture et Fonctionnement

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du Système](#architecture-du-système)
3. [Flux de Données](#flux-de-données)
4. [Composants Détaillés](#composants-détaillés)
5. [Gestion des Documents](#gestion-des-documents)
6. [Système RAG (Retrieval Augmented Generation)](#système-rag)
7. [Interface Admin](#interface-admin)
8. [Guide d'Utilisation](#guide-dutilisation)

---

## 🎯 Vue d'ensemble

Le chatbot utilise une architecture **RAG (Retrieval Augmented Generation)** qui combine :
- **Base de connaissances hardcodée** : Questions fréquentes sur ISO 59000
- **Documents uploadés** : PDFs, DOCX, TXT, MD traités et indexés
- **Embeddings vectoriels** : Pour recherche sémantique intelligente
- **LLM Hugging Face** : Pour générer des réponses contextuelles

### Pourquoi RAG ?

Le RAG permet au chatbot de :
- ✅ Répondre avec des informations **à jour** depuis vos documents
- ✅ Citer ses **sources** avec précision
- ✅ Éviter les **hallucinations** du LLM
- ✅ S'adapter à votre **contenu spécifique**

---

## 🏗️ Architecture du Système

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                     ChatbotWidget.tsx                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Interface de chat                                      │  │
│  │  • Suggestions de questions                               │  │
│  │  • Affichage réponses + sources                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP POST /chatbot/ask
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│                   ChatbotController.ts                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Routes:                                                  │  │
│  │  • POST /chatbot/ask          → Poser une question       │  │
│  │  • GET  /chatbot/suggestions  → Obtenir suggestions      │  │
│  │  • POST /chatbot/documents/upload → Upload doc (admin)   │  │
│  │  • GET  /chatbot/documents    → Liste docs (admin)       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ChatbotService.ts                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  1. Détection Small Talk (salutations, etc.)             │  │
│  │  2. Recherche base hardcodée (ISO 59000)                 │  │
│  │  3. Recherche documents uploadés (RAG)                   │  │
│  │  4. Combinaison et priorisation des résultats            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
      ┌──────────────────┴──────────────────┐
      │                                      │
      ▼                                      ▼
┌──────────────────────┐          ┌──────────────────────────────┐
│ Base Hardcodée       │          │ ChatbotDocumentsService.ts   │
│ (knowledgeBase)      │          │                              │
│                      │          │  • searchInDocumentsRAG()    │
│ • ISO 59000          │          │  • uploadDocument()          │
│ • Économie circulaire│          │  • Extraction contenu        │
│ • Plateforme         │          │  • Chunking + Embeddings     │
└──────────────────────┘          └─────────┬────────────────────┘
                                            │
                                            ▼
                                  ┌──────────────────────────────┐
                                  │ HuggingFaceRAGService.ts     │
                                  │                              │
                                  │  • generateEmbedding()       │
                                  │  • cosineSimilarity()        │
                                  │  • generateAnswer()          │
                                  │  • splitTextIntoChunks()     │
                                  └─────────┬────────────────────┘
                                            │
                                            ▼
                                  ┌──────────────────────────────┐
                                  │   Hugging Face API           │
                                  │                              │
                                  │  • sentence-transformers/    │
                                  │    all-MiniLM-L6-v2          │
                                  │    (Embeddings)              │
                                  │                              │
                                  │  • meta-llama/               │
                                  │    Meta-Llama-3-8B-Instruct  │
                                  │    (Génération réponses)     │
                                  └──────────────────────────────┘
```

---

## 🔄 Flux de Données

### 1️⃣ Upload d'un Document (Admin)

```
1. Admin upload PDF via /admin/chatbot-docs
2. ChatbotDocumentsService.uploadDocument()
   ├── Sauvegarde fichier dans /uploads/chatbot/
   ├── Extraction contenu (Python scripts)
   ├── Détection langue + comptage mots
   └── Stockage metadata en DB (ChatbotDocument)

3. En arrière-plan : generateChunksAndEmbeddings()
   ├── Découpage texte en chunks (500 chars, overlap 100)
   ├── Pour chaque chunk:
   │   ├── Génération embedding via Hugging Face
   │   └── Stockage (DocumentChunk + embedding JSON)
   └── Log progression

Résultat : Document indexé et prêt pour recherche sémantique
```

### 2️⃣ Question d'un Utilisateur

```
1. User tape question dans ChatbotWidget
2. POST /chatbot/ask { question: "..." }

3. ChatbotService.askQuestion()
   │
   ├── A. Small Talk ? (Bonjour, Au revoir, etc.)
   │   └── → Réponse pré-définie immédiate
   │
   ├── B. Recherche Base Hardcodée
   │   ├── Normalisation texte (accents, ponctuation)
   │   ├── Calcul score match keywords
   │   └── Meilleur match > 0.3 ? → Garde en réserve
   │
   └── C. Recherche RAG Documents
       │
       ├── ChatbotDocumentsService.searchInDocumentsRAG()
       │   │
       │   ├── 1. Génération embedding de la question
       │   │
       │   ├── 2. Récupération chunks actifs (DB)
       │   │
       │   ├── 3. Calcul similarité cosinus pour chaque chunk
       │   │      similarité = dotProduct / (||A|| × ||B||)
       │   │
       │   ├── 4. Top 5 chunks par similarité
       │   │
       │   ├── 5. Filtrage seuil > 0.3
       │   │
       │   └── 6. Si chunks pertinents trouvés:
       │       │
       │       ├── HuggingFaceRAGService.generateAnswer()
       │       │   ├── Construction prompt système
       │       │   ├── Contexte = Top 3 chunks
       │       │   ├── Appel Llama-3-8B (streaming)
       │       │   └── Parse réponse complète
       │       │
       │       └── Retour { answer, confidence, source, explanation }
       │
       └── Priorisation finale:
           1. Documents RAG (confidence > 0.3) → PRIORITÉ
           2. Base hardcodée (score > 0.3)
           3. Réponse par défaut (suggestions thèmes)

4. Réponse affichée dans ChatbotWidget avec source
```

---

## 🧩 Composants Détaillés

### 📄 ChatbotDocumentsService

**Responsabilités** :
- Gestion complète du cycle de vie des documents
- Extraction de contenu (PDF, DOCX, TXT, MD)
- Chunking et génération d'embeddings
- Recherche RAG avancée

**Méthodes principales** :

```typescript
// Upload et indexation
uploadDocument(file, title, description, uploadedBy)
  → Sauvegarde + extraction + chunking + embeddings

// Recherche RAG (intelligence sémantique)
searchInDocumentsRAG(query)
  → Embedding query + similarité + génération réponse LLM

// Recherche textuelle simple (backup)
searchInDocuments(query)
  → Recherche mots-clés basique

// CRUD admin
getAllDocuments()
toggleDocument(id)     // Activer/désactiver
deleteDocument(id)
```

**Scripts Python** :
- `extract_pdf.py` : Extraction texte PDF (PyPDF2)
- `extract_docx.py` : Extraction texte DOCX (python-docx)

### 🧠 HuggingFaceRAGService

**Modèles utilisés** :

1. **Embeddings** : `sentence-transformers/all-MiniLM-L6-v2`
   - Convertit texte → vecteur 384 dimensions
   - Rapide et performant
   - Supporte multilingue

2. **Génération** : `meta-llama/Meta-Llama-3-8B-Instruct`
   - LLM 8 milliards paramètres
   - Streaming des réponses
   - Température 0.3 (factuel)

**Méthodes clés** :

```typescript
// Génération embeddings
generateEmbedding(text: string): Promise<number[]>

// Similarité cosinus entre 2 vecteurs
cosineSimilarity(vecA, vecB): number

// Génération réponse contextuelle
generateAnswer(question, relevantChunks)
  → { answer, confidence, source, explanation }

// Découpage intelligent en chunks
splitTextIntoChunks(text, chunkSize=500, overlap=100)
```

### 💬 ChatbotService

**Base de connaissances hardcodée** :

```typescript
interface KnowledgeEntry {
  keywords: string[];     // Mots-clés de recherche
  answer: string;         // Réponse pré-rédigée
  category: string;       // Catégorie (normes, concepts, etc.)
  priority: number;       // 1-10, pour pondération
}
```

**Catégories** :
- `normes` : ISO 59000, 59004, 59020, etc.
- `concepts` : Économie circulaire, écoconception
- `plateforme` : Utilisation du site
- `small_talk` : Conversations sociales

---

## 📚 Gestion des Documents

### Format de Stockage en Base

**Table `ChatbotDocument`** :
```prisma
model ChatbotDocument {
  id          String   @id @default(uuid())
  filename    String
  fileType    String   // .pdf, .docx, .txt, .md
  filePath    String   // /uploads/chatbot/...
  fileSize    Int
  title       String
  description String?
  content     String   // Texte extrait complet
  isActive    Boolean  @default(true)
  uploadedBy  String
  uploadedAt  DateTime @default(now())
  wordCount   Int?
  language    String?  // fr, en, ar
  usageCount  Int      @default(0)
  lastUsed    DateTime?
  chunks      DocumentChunk[]
}
```

**Table `DocumentChunk`** :
```prisma
model DocumentChunk {
  id          String   @id @default(uuid())
  documentId  String
  document    ChatbotDocument @relation(...)
  chunkIndex  Int
  content     String   // Portion de texte (500 chars)
  embedding   String   // JSON array de 384 nombres
  createdAt   DateTime @default(now())
}
```

### Chunking Stratégie

**Paramètres** :
- Taille chunk : **500 caractères**
- Overlap : **100 caractères**
- Découpe : Par **phrases** (pas au milieu d'un mot)

**Pourquoi l'overlap ?**
- Évite perte contexte aux frontières
- Améliore pertinence recherche

**Exemple** :
```
Document: "L'économie circulaire vise à maintenir la valeur [...]"

Chunk 1: "L'économie circulaire vise à maintenir la valeur..."
Chunk 2: "...maintenir la valeur des produits et matières..."  ← overlap
Chunk 3: "...matières le plus longtemps possible en..."        ← overlap
```

---

## 🔍 Système RAG

### Étapes de Recherche RAG

#### 1. Génération Embedding Question

```typescript
const queryEmbedding = await ragService.generateEmbedding(
  "Comment réduire mes déchets ?"
)
// Résultat: [0.123, -0.456, 0.789, ...] (384 dimensions)
```

#### 2. Récupération Chunks Actifs

```typescript
const documents = await prisma.chatbotDocument.findMany({
  where: { isActive: true },
  include: { chunks: true }
})
```

#### 3. Calcul Similarité Cosinus

Pour chaque chunk, calcul de proximité sémantique :

```typescript
similarity = cosineSimilarity(queryEmbedding, chunkEmbedding)

// Formule mathématique:
// similarity = (A · B) / (||A|| × ||B||)
// Résultat entre -1 et 1 (1 = identique)
```

#### 4. Sélection Top Chunks

```typescript
const topChunks = chunksWithSimilarity
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, 5)

const relevantChunks = topChunks.filter(chunk => 
  chunk.similarity > 0.3  // Seuil minimum
)
```

#### 5. Génération Réponse LLM

```typescript
const prompt = `
Tu es un assistant expert en économie circulaire.

DOCUMENTS DE RÉFÉRENCE:
[Document 1: Guide ISO 59004]
${chunk1.content}

[Document 2: Économie circulaire]
${chunk2.content}

QUESTION:
Comment réduire mes déchets ?

INSTRUCTIONS:
- Réponds uniquement avec infos des documents
- Cite tes sources
- Sois précis et factuel
`

const response = await hf.chatCompletionStream({
  model: 'meta-llama/Meta-Llama-3-8B-Instruct',
  messages: [{ role: 'user', content: prompt }],
  temperature: 0.3  // Plus factuel
})
```

#### 6. Retour Structuré

```typescript
return {
  answer: "D'après le Guide ISO 59004, vous pouvez...",
  confidence: 0.87,  // Moyenne similarité chunks
  source: "Guide ISO 59004, Économie circulaire",
  explanation: "Réponse générée à partir de 3 passages (87% similarité)"
}
```

---

## 🛠️ Interface Admin

### Accès

**URL** : `/admin/chatbot-docs`

**Authentification** : Token admin requis

### Fonctionnalités

#### 📤 Upload Document

1. Cliquer "📤 Uploader un document"
2. Remplir formulaire :
   - Titre
   - Description (optionnel)
   - Fichier (PDF, DOCX, TXT, MD)
3. Validation → Traitement automatique

**Traitement en arrière-plan** :
```
✓ Fichier sauvegardé
✓ Contenu extrait
✓ 15 chunks créés
✓ 15 embeddings générés
✓ Document indexé
```

#### 📋 Liste Documents

Tableau avec :
- ✅/❌ Statut actif
- 📄 Titre + description
- 📊 Mots, Type, Taille
- 📈 Utilisation (compteur)
- 🗑️ Actions (toggle/supprimer)

#### 🔄 Activer/Désactiver

Toggle pour inclure/exclure document de la recherche **sans le supprimer**.

---

## 📖 Guide d'Utilisation

### Pour les Développeurs

#### Configuration Requise

**Variable d'environnement** :
```bash
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
```

Obtenir sur : https://huggingface.co/settings/tokens

#### Retraitement Documents

Si vous devez regénérer les embeddings :

```bash
cd backend
npm run reprocess-docs
```

**Script** : `backend/scripts/reprocess-documents.ts`

### Pour les Admins

#### Bonnes Pratiques Upload

✅ **À faire** :
- Documents pertinents ISO 59000
- Titre descriptif
- Format structuré (PDF avec OCR lisible)
- Français ou anglais

❌ **À éviter** :
- Documents trop longs (>100 pages)
- Scans illisibles
- Doublons
- Contenus hors sujet

#### Maintenance

**Surveiller** :
- Compteur `usageCount` : documents populaires
- `lastUsed` : documents obsolètes
- Taille DB (chunks)

**Nettoyer** :
- Supprimer documents non utilisés
- Désactiver temporairement si besoin

### Pour les Utilisateurs

#### Questions Efficaces

✅ **Bonnes questions** :
- "Comment fonctionne ISO 59004 ?"
- "Quels sont les principes d'économie circulaire ?"
- "Comment utiliser cette plateforme ?"

❌ **Questions inefficaces** :
- Trop vagues : "Aide-moi"
- Hors sujet : "Recette de cuisine"
- Trop techniques sans contexte

#### Comprendre les Réponses

**Indicateurs de qualité** :

```typescript
confidence: 0.87  // 87% de confiance
source: "Guide ISO 59004"
explanation: "3 passages pertinents trouvés"
```

- **Confidence > 0.7** : Réponse fiable
- **Confidence 0.3-0.7** : Réponse partielle
- **Confidence < 0.3** : Réponse par défaut

---

## 🚀 Améliorations Futures

### Court Terme
- [ ] Feedback utilisateur (👍👎)
- [ ] Historique conversations persistant
- [ ] Export réponses en PDF

### Moyen Terme
- [ ] Fine-tuning modèle sur corpus ISO
- [ ] Multi-langue (arabe)
- [ ] Recherche hybride (keywords + semantic)

### Long Terme
- [ ] Base vectorielle dédiée (Pinecone/Milvus)
- [ ] Modèle local (Ollama)
- [ ] Graph RAG pour relations complexes

---

## 📞 Support

**Problèmes courants** :

1. **"Aucun document disponible"**
   → Uploader documents via admin

2. **"Erreur génération embeddings"**
   → Vérifier HUGGINGFACE_API_KEY

3. **Réponses non pertinentes**
   → Améliorer qualité documents sources

**Logs utiles** :
```bash
# Backend
cd backend
npm run start:dev

# Vérifier documents
npm run check-docs
```

---

**Dernière mise à jour** : Décembre 2025  
**Version** : 2.0 - Architecture RAG complète
