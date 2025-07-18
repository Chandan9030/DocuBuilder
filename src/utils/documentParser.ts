import fs from "fs"
import pdf from "pdf-parse"

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdf(dataBuffer)
    return data.text || ""
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    return ""
  }
}

/**
 * Extract text from DOCX file (simplified version)
 * @param {string} filePath - Path to DOCX file
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromDOCX(filePath) {
  try {
    // For now, we'll use a simple approach
    // You can enhance this later with mammoth
    const buffer = fs.readFileSync(filePath)
    const text = buffer.toString("utf8")
    // Basic text extraction - remove binary data
    const cleanText = text.replace(/[^\x20-\x7E\n\r\t]/g, " ").trim()
    return cleanText.substring(0, 5000) // Limit to 5000 chars
  } catch (error) {
    console.error("Error extracting text from DOCX:", error)
    return ""
  }
}

/**
 * Extract metadata from document
 * @param {string} filePath - Path to document
 * @param {string} fileType - Type of document (pdf, docx)
 * @returns {Promise<Object>} - Document metadata
 */
export async function extractMetadata(filePath, fileType) {
  try {
    const stats = fs.statSync(filePath)
    return {
      size: stats.size,
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString(),
      accessed: stats.atime.toISOString(),
      fileType: fileType,
    }
  } catch (error) {
    console.error(`Error extracting metadata from ${fileType}:`, error)
    return {}
  }
}
