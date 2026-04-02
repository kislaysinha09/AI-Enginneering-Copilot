const buildPrompt = (query, chunks) => {
  const context = chunks.map((c, i) => {
    return `Chunk ${i + 1}:\n${c.text}`;
  }).join("\n\n");

  return `
You are an AI assistant. Answer the question based ONLY on the context below.

Context:
${context}

Question:
${query}

Answer clearly and concisely:
`;
};

module.exports = { buildPrompt };   