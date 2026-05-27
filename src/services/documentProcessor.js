// Polyfill for pdf-parse compatibility with Node 20+
if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class {};
}
// Polyfill ImageData for environments lacking it
if (typeof global.ImageData === 'undefined') {
  global.ImageData = class {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.data = new Uint8ClampedArray(width * height * 4);
    }
  };
}
// Polyfill Path2D for environments lacking it
if (typeof global.Path2D === 'undefined') {
  global.Path2D = class {
    constructor(path) {
      this.path = path || '';
    }
  };
}
// Polyfill process.getBuiltinModule to silence warnings
if (typeof process.getBuiltinModule !== 'function') {
  process.getBuiltinModule = () => undefined;
}

let pdf;
try {
  const loadedPdf = require('pdf-parse');
  if (typeof loadedPdf === 'function') {
    pdf = loadedPdf;
  } else if (loadedPdf.PDFParse) {
    pdf = loadedPdf.PDFParse;
  } else if (loadedPdf.default) {
    pdf = loadedPdf.default;
  } else {
    pdf = loadedPdf;
  }
  console.log('DEBUG: pdf-parse loaded. Type of pdf:', typeof pdf);
} catch (e) {
  console.log('DEBUG: pdf-parse root load failed, trying lib...');
  try {
    pdf = require('pdf-parse/lib/pdf-parse.js');
  } catch (err) {
    console.error('DEBUG: pdf-parse lib load failed:', err);
  }
}

const mammoth = require('mammoth');

class DocumentProcessor {
  async extractText(buffer, mimetype) {
    console.log(`Extracting text from ${mimetype}...`);
    switch (mimetype) {
      case 'application/pdf':
        return await this._extractFromPdf(buffer);
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return await this._extractFromDocx(buffer);
      case 'text/plain':
        return buffer.toString('utf-8');
      default:
        if (mimetype.startsWith('text/')) {
          return buffer.toString('utf-8');
        }
        throw new Error(`Unsupported file type: ${mimetype}`);
    }
  }

  async _extractFromPdf(buffer) {
    try {
      let parser = pdf;
      if (typeof parser !== 'function' && parser.default) {
        parser = parser.default;
      }
      if (typeof parser !== 'function' && parser.PDFParse) {
        parser = parser.PDFParse;
      }
      if (typeof parser !== 'function') {
        console.log('DEBUG: parser is still not a function. Value:', parser);
        throw new Error('pdf-parse is not a function');
      }

      // Check if it's the new class constructor (requires 'new') vs old function
      if (parser.prototype && typeof parser.prototype.getText === 'function') {
        console.log('DEBUG: Detected new pdf-parse class syntax');
        const instance = new parser({ data: buffer });
        const data = await instance.getText();
        return data.text || "";
      } else {
        console.log('DEBUG: Detected classic pdf-parse function syntax');
        const data = await parser(buffer);
        return data.text || "";
      }
    } catch (error) {
      console.error('PDF Extraction Error:', error.message);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  async _extractFromDocx(buffer) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      console.error('DOCX Extraction Error:', error);
      throw new Error('Failed to extract text from DOCX');
    }
  }
}

module.exports = new DocumentProcessor();
