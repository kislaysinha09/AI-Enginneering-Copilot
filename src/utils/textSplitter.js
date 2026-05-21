/**
 * Splits text into chunks while attempting to maintain semantic boundaries.
 */
class RecursiveCharacterTextSplitter {
  constructor(chunkSize = 1000, chunkOverlap = 200) {
    this.chunkSize = chunkSize;
    this.chunkOverlap = chunkOverlap;
    this.separators = ["\n\n", "\n", " ", ""];
  }

  splitText(text) {
    const finalChunks = [];
    
    // Start splitting recursively
    this._splitRecursive(text, this.separators, finalChunks);
    
    // Merge small chunks if possible
    return this._mergeChunks(finalChunks);
  }

  _splitRecursive(text, separators, chunks) {
    if (text.length <= this.chunkSize) {
      chunks.push(text);
      return;
    }

    const separator = separators[0];
    const splits = text.split(separator);
    
    let currentDoc = "";
    for (const split of splits) {
      if (currentDoc.length + split.length + separator.length > this.chunkSize) {
        if (currentDoc.length > 0) {
          chunks.push(currentDoc);
        }
        
        // If the split itself is too large, go deeper with the next separator
        if (split.length > this.chunkSize) {
          if (separators.length > 1) {
            this._splitRecursive(split, separators.slice(1), chunks);
          } else {
            // No more separators, just force cut
            chunks.push(split.substring(0, this.chunkSize));
          }
        } else {
          currentDoc = split;
        }
      } else {
        currentDoc += (currentDoc === "" ? "" : separator) + split;
      }
    }
    
    if (currentDoc !== "") {
      chunks.push(currentDoc);
    }
  }

  _mergeChunks(chunks) {
    // Basic merging with overlap
    // For now, let's keep it simple and just return the chunks from the recursive split
    // In a full implementation, we would add overlap here.
    return chunks;
  }
}

const defaultSplitter = new RecursiveCharacterTextSplitter();
module.exports = { RecursiveCharacterTextSplitter, defaultSplitter };
