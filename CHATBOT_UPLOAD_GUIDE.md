
# 🤖 Guide d'Enrichissement du Chatbot - Upload de Documentation

## Vue d'ensemble

Ce guide explique comment enrichir la base de connaissances du chatbot en uploadant de la documentation côté admin. Le chatbot s'entraînera automatiquement sur les documents fournis pour répondre avec une plus large gamme de connaissances.

---

## 🎯 Fonctionnalités

### Côté Admin

1. **Upload de documents** : PDF, TXT, MD, DOCX
2. **Prévisualisation** : Voir les documents uploadés
3. **Gestion** : Activer/désactiver, supprimer des documents
4. **Indexation automatique** : Le contenu est extrait et indexé

### Côté Chatbot

1. **Recherche sémantique** : Trouve les passages pertinents
2. **Réponses contextuelles** : Utilise les documents pour répondre
3. **Citations** : Référence les sources utilisées
4. **Apprentissage continu** : S'améliore avec chaque document

---

## 📁 Types de Documents Supportés

| Extension | Type | Taille Max | Extraction |
|-----------|------|-----------|------------|
| `.pdf` | PDF | 10 MB | pypdf2 / pdfplumber |
| `.txt` | Texte | 5 MB | Directe |
| `.md` | Markdown | 5 MB | Directe |
| `.docx` | Word | 10 MB | python-docx |

---

## 🏗️ Architecture Technique

### Stack Technologique

**Backend** :
- **Framework** : NestJS
- **Extraction texte** : python scripts (subprocess)
- **Stockage** : Base de données + fichiers locaux
- **Recherche** : Algorithme TF-IDF ou embeddings

**Frontend Admin** :
- **Upload** : React Dropzone
- **Prévisualisation** : react-pdf
- **Gestion** : Table avec actions CRUD

### Base de Données (Prisma)

```prisma
model ChatbotDocument {
  id          String   @id @default(uuid())
  filename    String
  fileType    String   // pdf, txt, md, docx
  filePath    String   // Chemin fichier sur disque
  fileSize    Int      // Taille en bytes
  
  title       String   // Titre du document
  description String?  // Description optionnelle
  
  content     String   @db.Text  // Contenu extrait
  isActive    Boolean  @default(true)
  
  uploadedBy  String   // ID admin
  uploadedAt  DateTime @default(now())
  
  // Métadonnées pour la recherche
  wordCount   Int?
  language    String?  // fr, ar, en
  
  // Statistiques d'utilisation
  usageCount  Int      @default(0)
  lastUsed    DateTime?
}
```

---

## 🔄 Flux d'Upload et d'Indexation

### 1. Upload Fichier (Admin)

```
Admin sélectionne fichier
    ↓
Frontend valide (type, taille)
    ↓
POST /admin/chatbot/documents/upload
    ↓
Backend sauvegarde fichier
    ↓
Extraction du contenu
    ↓
Indexation dans la base
    ↓
Confirmation à l'admin
```

### 2. Extraction de Contenu

**Pour PDF** :
```python
# backend/scripts/extract_pdf.py
import sys
from pypdf2 import PdfReader

def extract_text(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    print(extract_text(pdf_path))
```

**Pour DOCX** :
```python
# backend/scripts/extract_docx.py
import sys
from docx import Document

def extract_text(docx_path):
    doc = Document(docx_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

if __name__ == "__main__":
    print(extract_text(sys.argv[1]))
```

### 3. Recherche et Réponse

```
Utilisateur pose question
    ↓
Chatbot normalise la question
    ↓
Recherche dans knowledgeBase (hardcodé)
    ↓
Recherche dans documents uploadés
    ↓
Combine les résultats
    ↓
Génère réponse avec citations
    ↓
Affiche à l'utilisateur
```

---

## 📝 API Backend

### Endpoints Admin

#### 1. Upload Document
```
POST /admin/chatbot/documents/upload
Content-Type: multipart/form-data

Body:
- file: File (requis)
- title: string (requis)
- description: string (optionnel)

Response:
{
  "id": "uuid",
  "filename": "ISO_59004_guide.pdf",
  "title": "Guide ISO 59004",
  "fileSize": 2048576,
  "wordCount": 15000,
  "uploadedAt": "2025-10-22T10:00:00Z"
}
```

#### 2. Liste des Documents
```
GET /admin/chatbot/documents

Response:
{
  "documents": [
    {
      "id": "uuid",
      "filename": "ISO_59004_guide.pdf",
      "title": "Guide ISO 59004",
      "fileSize": 2048576,
      "isActive": true,
      "usageCount": 45,
      "uploadedAt": "2025-10-22T10:00:00Z"
    }
  ],
  "total": 10
}
```

#### 3. Activer/Désactiver Document
```
PATCH /admin/chatbot/documents/:id/toggle

Response:
{
  "id": "uuid",
  "isActive": false
}
```

#### 4. Supprimer Document
```
DELETE /admin/chatbot/documents/:id

Response:
{
  "message": "Document supprimé avec succès"
}
```

### Endpoints Chatbot (enrichis)

#### Ask Question (modifié)
```
POST /chatbot/ask

Body:
{
  "question": "Comment mettre en œuvre ISO 59004 ?",
  "context": "optional"
}

Response:
{
  "question": "Comment mettre en œuvre ISO 59004 ?",
  "answer": "Selon le guide ISO 59004, la mise en œuvre...",
  "confidence": 0.92,
  "sources": [
    {
      "type": "document",
      "title": "Guide ISO 59004",
      "excerpt": "La mise en œuvre de l'économie circulaire...",
      "page": 12
    },
    {
      "type": "knowledge_base",
      "category": "normes"
    }
  ]
}
```

---

## 🔍 Algorithme de Recherche

### Option 1 : TF-IDF (Simple, sans IA)

**Avantages** :
- Rapide
- Pas besoin d'API externe
- Fonctionne hors ligne

**Fonctionnement** :
1. Tokeniser la question et les documents
2. Calculer TF-IDF pour chaque terme
3. Calculer similarité cosinus
4. Retourner les N passages les plus pertinents

```typescript
// Pseudo-code
function searchDocuments(question: string, documents: Document[]) {
  const questionTokens = tokenize(question);
  const results = [];
  
  for (const doc of documents) {
    const docTokens = tokenize(doc.content);
    const similarity = cosineSimilarity(questionTokens, docTokens);
    
    if (similarity > 0.3) {
      results.push({
        document: doc,
        similarity: similarity,
        excerpt: extractRelevantExcerpt(doc.content, questionTokens)
      });
    }
  }
  
  return results.sort((a, b) => b.similarity - a.similarity);
}
```

### Option 2 : Embeddings + RAG (Avancé, avec IA)

**Avantages** :
- Compréhension sémantique
- Réponses plus précises
- Gestion multilingue

**Stack** :
- **OpenAI Embeddings** : text-embedding-3-small
- **Base vectorielle** : Pinecone / ChromaDB
- **LLM** : GPT-4 Turbo

**Workflow** :
```
Document uploadé
    ↓
Découpage en chunks (500 mots)
    ↓
Génération embeddings (OpenAI)
    ↓
Stockage dans Pinecone
    ↓
Question utilisateur
    ↓
Embedding de la question
    ↓
Recherche vectorielle (top 5 chunks)
    ↓
Envoi à GPT-4 avec contexte
    ↓
Génération réponse
```

---

## 🎨 Interface Admin (Wireframe)

```
┌────────────────────────────────────────────────────────┐
│  📚 Gestion Base de Connaissances Chatbot              │
├────────────────────────────────────────────────────────┤
│                                                         │
│  [📤 Uploader un document]                             │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Titre:      Guide ISO 59004                      │ │
│  │ Description: Mise en œuvre économie circulaire   │ │
│  │ Fichier:    [Parcourir...]  ISO_59004.pdf       │ │
│  │                             [Uploader]            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Documents Actifs (10)                                 │
│  ┌──────┬──────────────┬────────┬─────────┬────────┐ │
│  │ Titre│   Fichier    │ Taille │Utilisé  │Actions │ │
│  ├──────┼──────────────┼────────┼─────────┼────────┤ │
│  │Guide │ISO_59004.pdf │ 2.5 MB │  45×    │🔍 ✏️ 🗑️│ │
│  │ISO   │ISO_59020.pdf │ 1.8 MB │  32×    │🔍 ✏️ 🗑️│ │
│  │Maroc │maroc_ec.docx │ 980 KB │  12×    │🔍 ✏️ 🗑️│ │
│  └──────┴──────────────┴────────┴─────────┴────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Plan d'Implémentation

### Phase 1 : Backend Upload (1-2 jours)

1. Créer schéma Prisma `ChatbotDocument`
2. Créer module `ChatbotDocuments`
3. Implémenter upload + extraction
4. Stockage fichiers dans `/backend/uploads/chatbot/`

### Phase 2 : Indexation Simple (1 jour)

1. Extraction texte (PDF, DOCX, TXT, MD)
2. Stockage contenu en base
3. Recherche par mots-clés (TF-IDF)

### Phase 3 : Interface Admin (2 jours)

1. Page upload de documents
2. Liste des documents
3. Actions : activer/désactiver, supprimer
4. Statistiques d'utilisation

### Phase 4 : Intégration Chatbot (1 jour)

1. Modifier `ChatbotService.askQuestion()`
2. Chercher dans documents ET knowledge base
3. Combiner résultats
4. Afficher sources

### Phase 5 : Amélioration RAG (optionnel, 3-5 jours)

1. Intégration OpenAI Embeddings
2. Setup Pinecone / ChromaDB
3. Chunking intelligent des documents
4. Génération réponses via GPT-4

---

## 📊 Exemple d'Utilisation

### Scénario

**Admin** uploade le document officiel **"ISO 59004:2024 - Guide complet"** (50 pages PDF).

**Extraction** :
- 15,000 mots extraits
- Indexé en base de données
- Découpé en 30 chunks sémantiques

**Utilisateur** demande : *"Quelles sont les étapes de mise en œuvre d'ISO 59004 ?"*

**Chatbot** :
1. Cherche dans knowledge base hardcodé → match partiel (confiance 0.7)
2. Cherche dans document uploadé → trouve chapitre 3, page 12
3. Combine les deux sources
4. Génère réponse enrichie :

```
📋 Selon le guide ISO 59004:2024, la mise en œuvre de l'économie 
circulaire se fait en 5 étapes principales :

1. Diagnostic initial (analyse des flux)
2. Définition des objectifs stratégiques
3. Identification des opportunités circulaires
4. Mise en place d'actions pilotes
5. Déploiement et amélioration continue

📚 Source : ISO 59004:2024 - Guide complet (page 12)
```

---

## 🔐 Sécurité

### Validation des Fichiers

```typescript
// Whitelist extensions
const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.md', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function validateFile(file: File) {
  const ext = path.extname(file.name).toLowerCase();
  
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error('Type de fichier non autorisé');
  }
  
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Fichier trop volumineux');
  }
  
  return true;
}
```

### Sanitization du Contenu

```typescript
function sanitizeContent(content: string): string {
  // Supprime les scripts malveillants
  return content
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/on\w+=".*?"/gi, '')
    .trim();
}
```

---

## 📈 Métriques de Succès

### KPIs à suivre

1. **Nombre de documents uploadés** : Target 20+ documents
2. **Taux d'utilisation** : % de questions utilisant les documents
3. **Score de confiance moyen** : Target > 0.8
4. **Satisfaction utilisateur** : Feedback chatbot

### Dashboard Admin

```
┌─────────────────────────────────────────────────┐
│  📊 Statistiques Base de Connaissances          │
├─────────────────────────────────────────────────┤
│  Documents actifs:     15                       │
│  Total mots indexés:   250,000                  │
│  Questions répondues:  1,234                    │
│  Utilisation docs:     68%                      │
│  Confiance moyenne:    0.87                     │
└─────────────────────────────────────────────────┘
```

---

## 🎓 Ressources

### Documentation Technique

- **Prisma** : https://www.prisma.io/docs
- **PyPDF2** : https://pypdf2.readthedocs.io/
- **python-docx** : https://python-docx.readthedocs.io/
- **OpenAI Embeddings** : https://platform.openai.com/docs/guides/embeddings
- **Pinecone** : https://docs.pinecone.io/

### Articles de Référence

- RAG (Retrieval Augmented Generation)
- TF-IDF et similarité cosinus
- Chunking strategies for LLMs

---

**Dernière mise à jour** : 22 octobre 2025  
**Version** : 1.0  
**Auteur** : Framework Économie Circulaire - ISO 59000
