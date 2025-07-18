import express from "express"
import Document from "../models/Document.js"
import mongoose from "mongoose"

const router = express.Router()

// Enhanced error handling middleware
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Get all saved documents
router.get(
  "/",
  handleAsync(async (req, res) => {
    console.log("📋 GET /api/documents - Fetching all documents...")

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState)
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable",
        connectionState: mongoose.connection.readyState,
      })
    }

    const documents = await Document.find().sort({ updatedAt: -1 })
    console.log(`✅ Found ${documents.length} documents`)

    res.json(documents)
  }),
)

// Get a specific document by ID
router.get(
  "/:id",
  handleAsync(async (req, res) => {
    console.log("📄 GET /api/documents/:id - Fetching document:", req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID format",
      })
    }

    const document = await Document.findById(req.params.id)

    if (!document) {
      console.log("❌ Document not found")
      return res.status(404).json({
        success: false,
        message: "Document not found",
      })
    }

    console.log("✅ Document found:", document.title)
    res.json(document)
  }),
)

// Save a new document
router.post(
  "/",
  handleAsync(async (req, res) => {

    console.log("💾 POST /api/documents - Save new document")
    console.log("Request body:", JSON.stringify(req.body, null, 2))

    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState)
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable",
        connectionState: mongoose.connection.readyState,
      })
    }

    const { title, templateType, formData } = req.body

    // Enhanced validation
    const validationErrors = []

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      validationErrors.push("Title is required and must be a non-empty string")
    }

    if (!templateType || !["internshipLetter", "offerLetter", "certificate", "experienceCertificate","relievingLetter", "exitFormalityFinal", "hikeLetter", "salarySlip"].includes(templateType)) {
      validationErrors.push("Valid template type is required (internshipLetter, offerLetter, certificate, experienceCertificate, relievingLetter, exitFormalityFinal, hikeLetter or salarySlip)")
    }

    if (!formData || typeof formData !== "object" || Object.keys(formData).length === 0) {
      validationErrors.push("Form data is required and must be a non-empty object")
    }

    if (validationErrors.length > 0) {
      console.log("❌ Validation failed:", validationErrors)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
        received: {
          title: typeof title,
          templateType: typeof templateType,
          formData: typeof formData,
          formDataKeys: formData ? Object.keys(formData) : [],
        },
      })
    }

    console.log("✅ Validation passed, creating document...")

    // Create new document
    const document = new Document({
      title: title.trim(),
      templateType,
      formData,
    })

    console.log("📝 Document object created, attempting to save...")

    try {
      const savedDocument = await document.save()
      console.log("✅ Document saved successfully with ID:", savedDocument._id)

      res.status(201).json({
        success: true,
        message: "Document saved successfully",
        document: savedDocument,
      })
    } catch (saveError) {
      console.error("❌ Error during document.save():", saveError)

      if (saveError.name === "ValidationError") {
        const validationMessages = Object.values(saveError.errors).map((err) => err.message)
        return res.status(400).json({
          success: false,
          message: "Document validation failed",
          errors: validationMessages,
          details: saveError.errors,
        })
      }

      throw saveError // Re-throw for general error handler
    }
  }),
)

// Update an existing document
router.put(
  "/:id",
  handleAsync(async (req, res) => {
    console.log("✏️ PUT /api/documents/:id - Update document:", req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID format",
      })
    }

    const { title, templateType, formData } = req.body

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title: title?.trim(),
        templateType,
        formData,
        updatedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      },
    )

    if (!document) {
      console.log("❌ Document not found for update")
      return res.status(404).json({
        success: false,
        message: "Document not found",
      })
    }

    console.log("✅ Document updated successfully")
    res.json({
      success: true,
      message: "Document updated successfully",
      document,
    })
  }),
)

// Delete a document
router.delete(
  "/:id",
  handleAsync(async (req, res) => {
    console.log("🗑️ DELETE /api/documents/:id - Delete document:", req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID format",
      })
    }

    const document = await Document.findByIdAndDelete(req.params.id)

    if (!document) {
      console.log("❌ Document not found for deletion")
      return res.status(404).json({
        success: false,
        message: "Document not found",
      })
    }

    console.log("✅ Document deleted successfully")
    res.json({
      success: true,
      message: "Document deleted successfully",
    })
  }),
)

// Error handling middleware for this router
router.use((error, req, res, next) => {
  console.error("🚨 Router Error:", error)
  console.error("Stack trace:", error.stack)

  // MongoDB connection errors
  if (error.name === "MongoNetworkError" || error.name === "MongooseServerSelectionError") {
    return res.status(503).json({
      success: false,
      message: "Database connection error",
      error: "Unable to connect to database",
    })
  }

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    const validationMessages = Object.values(error.errors).map((err) => err.message)
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: validationMessages,
    })
  }

  // Mongoose cast errors (invalid ObjectId, etc.)
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid data format",
      error: error.message,
    })
  }

  // Generic server error
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    timestamp: new Date().toISOString(),
  })
})

export default router

