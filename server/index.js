import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { createServer } from "http"
import documentRoutes from "./routes/documents.js"
import emailRoutes from "./routes/email.js"
import puppeteer from "puppeteer"

// Load environment variables
dotenv.config()

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/docubuilder"
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

console.log("🚀 Starting server...")
console.log("Environment:", process.env.NODE_ENV || "development")
console.log("Port:", PORT)
console.log("MongoDB URI:", MONGODB_URI)
console.log("Email User:", EMAIL_USER ? "Configured" : "Missing")
console.log("Email Password:", EMAIL_PASS ? "Configured" : "Missing")

// Validate email credentials
if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("⚠️ Email credentials missing. Email sending will fail. Please set EMAIL_USER and EMAIL_PASS in .env")
}

// Enhanced CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`${timestamp} - ${req.method} ${req.path}`)
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request body keys:", Object.keys(req.body))
    if (req.body.title) console.log("Title:", req.body.title)
    if (req.body.templateType) console.log("Template Type:", req.body.templateType)
    if (req.body.formData) console.log("Form Data Keys:", Object.keys(req.body.formData))
    if (req.path.includes("/send-document")) {
      console.log("Recipient Email:", req.body.recipientEmail)
      console.log("Subject:", req.body.subject)
      console.log("PDF Filename:", req.body.pdfFilename)
      console.log("PDF Base64 Length:", req.body.pdfBase64?.length || 0)
    }
  }
  next()
})

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "../dist")))

// Connect to MongoDB with enhanced error handling
console.log("🔌 Attempting to connect to MongoDB...")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      heartbeatFrequencyMS: 2000,
      retryWrites: true,
    })

    console.log("✅ Connected to MongoDB successfully")
    console.log("Database name:", conn.connection.name)
    console.log("Host:", conn.connection.host)
    console.log("Port:", conn.connection.port)

    return conn
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    console.error("Full error:", error)
    if (process.env.NODE_ENV === "production") {
      process.exit(1)
    } else {
      console.log("⚠️ Continuing in development mode without MongoDB...")
    }
  }
}

// Connect to database
connectDB()

// MongoDB connection event listeners
mongoose.connection.on("error", (error) => {
  console.error("🚨 MongoDB connection error:", error)
})

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected")
})

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected")
})

// Routes
app.get("/api/health", (req, res) => {
  const mongoState = mongoose.connection.readyState
  const mongoStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  }

  res.status(200).json({
    status: "ok",
    message: "Server is running",
    mongodb: {
      state: mongoStates[mongoState],
      readyState: mongoState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    },
    email: {
      configured: !!(EMAIL_USER && EMAIL_PASS),
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

// Document and email routes
app.use("/api/documents", documentRoutes)
app.use("/api", emailRoutes) // Fixed: Mount emailRoutes under /api instead of /api/send-document

// PDF generation route
app.post("/api/generate-pdf", async (req, res) => {
  try {
    console.log("📄 Generating PDF...")
    const { templateType, formData } = req.body

    if (!templateType || !formData) {
      return res.status(400).json({
        success: false,
        message: "Template type and form data are required",
      })
    }

    // Simple HTML template for PDF
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Document PDF</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; margin: 40px; }
            h1 { color: #2563eb; }
            .section { margin-bottom: 24px; }
          </style>
        </head>
        <body>
          <h1>${templateType}</h1>
          <div class="section"><strong>Recipient:</strong> ${formData.recipientName || ""}</div>
          <div class="section"><strong>Data:</strong> <pre>${JSON.stringify(formData, null, 2)}</pre></div>
        </body>
      </html>
    `

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true })
    await browser.close()

    const recipientName = formData.recipientName?.replace(/\s+/g, "_") || "document"
    const date = new Date().toISOString().split("T")[0]
    const filename = `${templateType}_${recipientName}_${date}.pdf`

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": pdfBuffer.length,
    })

    console.log("✅ PDF generated successfully")
    res.send(pdfBuffer)
  } catch (error) {
    console.error("❌ Error generating PDF:", error)
    res.status(500).json({
      success: false,
      message: "Error generating PDF",
      error: error.message,
    })
  }
})

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error("🚨 Unhandled error:", error)
  console.error("Stack trace:", error.stack)

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    timestamp: new Date().toISOString(),
  })
})

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../dist/index.html"))
})

// Start the server
const server = createServer(app)

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`📋 Documents API: http://localhost:${PORT}/api/documents`)
  console.log(`📧 Email API: http://localhost:${PORT}/api/send-document`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  server.close(() => {
    mongoose.connection.close()
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  server.close(() => {
    mongoose.connection.close()
    process.exit(0)
  })
})

export default app;