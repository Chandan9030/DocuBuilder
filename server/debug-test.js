import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/docubuilder"

console.log("Testing MongoDB connection...")
console.log("Connection string:", MONGODB_URI)

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    })

    console.log("✅ MongoDB connection successful")
    console.log("Database name:", mongoose.connection.name)
    console.log("Connection state:", mongoose.connection.readyState)

    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      test: String,
      createdAt: { type: Date, default: Date.now },
    })

    const TestModel = mongoose.model("Test", testSchema)

    const testDoc = new TestModel({ test: "Hello World" })
    const saved = await testDoc.save()
    console.log("✅ Test document saved:", saved._id)

    // Clean up
    await TestModel.deleteOne({ _id: saved._id })
    console.log("✅ Test document deleted")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    console.error("Full error:", error)
  } finally {
    await mongoose.connection.close()
    console.log("Connection closed")
  }
}

testConnection()
