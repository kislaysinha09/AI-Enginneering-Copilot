AI Engineering Copilot Backend
An intelligent Node.js backend for an AI-powered engineering assistant
that processes documents, converts them into vector embeddings, and
answers user queries using Retrieval-Augmented Generation (RAG).

Key Features
-   Document Processing
-   Vector Search (Semantic Search)
-   Retrieval-Augmented Generation (RAG)
-   In-Memory Vector Store

Interesting Techniques Used
1.  Text Chunking with Overlap
2.  Cosine Similarity (Manual Implementation)
3.  Vector Search Engine
4.  Prompt Engineering for RAG
5.  In-Memory Vector Storage

Tech Stack
-   Node.js
-   Express.js
-   OpenAI API
-   Multer
-   Dotenv

Project Structure

├── index.js
├── package.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/

Installation & Setup

1.  Clone the Repository git clone
    git clone <repository-url>
    cd <repository-directory>

2.  Install Dependencies npm install
    npm install

4.  Setup Environment Variables
    OPENAI_API_KEY=your_openai_api_key_here
    PORT=3000

6.  Start the Server npm start
    npm start

How It Works

1.  Upload a document
2.  Text is chunked with overlap
3.  Embeddings are generated
4.  Stored in vector store
5.  Query converted into embedding
6.  Similar chunks retrieved
7.  Context + query sent to LLM
8.  Final answer generated

Use Cases

-   AI-powered document assistant
-   Knowledge base search
-   Engineering copilots

Author
Kislay Sinha
