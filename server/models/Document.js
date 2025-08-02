import mongoose from "mongoose"

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    templateType: {
      type: String,
      required: [true, "Template type is required"],
      // enum: {
      //   values: ["internshipLetter", "offerLetter", "certificate", "experienceCertificate","relievingLetter", "exitFormalityFinal", "hikeLetter", "salarySlip", "paymentReceipt"],
      // },
    },
    formData: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Form data is required"],
      validate: {
        validator: (v) => v && typeof v === "object" && Object.keys(v).length > 0,
        message: "Form data must be a non-empty object",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically handle createdAt and updatedAt
  },
)

// Update the updatedAt field before saving
documentSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Add error handling for validation
documentSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    console.error("Validation Error:", error.message)
  }
  next(error)
})

export default mongoose.model("Document", documentSchema)
