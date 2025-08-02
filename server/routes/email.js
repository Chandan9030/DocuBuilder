import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle async errors
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/send-document
router.post(
  "/send-document",
  handleAsync(async (req, res) => {
    console.log("📧 POST /api/send-document - Sending email...");
    console.log("Request body:", {
      recipientEmail: req.body.recipientEmail,
      recipientName: req.body.recipientName,
      studentName: req.body.studentName,
      studentRollNo: req.body.studentRollNo,
      subject: req.body.subject,
      pdfFilename: req.body.pdfFilename,
      pdfBase64Length: req.body.pdfBase64?.length || 0,
      subject: req.body.subject,
      pdfFilename: req.body.pdfFilename,
      pdfBase64Length: req.body.pdfBase64?.length || 0,
    });
    console.log("Nodemailer config:", {
      user: process.env.EMAIL_USER || "Not set",
      pass: process.env.EMAIL_PASS ? "Set (hidden)" : "Not set",
    });

    const { recipientEmail, recipientName, pdfBase64, pdfFilename, subject } = req.body;

    // Validation
    const validationErrors = [];
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      validationErrors.push("Valid recipient email is required");
    }
    if (!recipientName || typeof recipientName !== "string" || recipientName.trim().length === 0) {
      validationErrors.push("Recipient name is required and must be a non-empty string");
    }
    if (!pdfBase64 || typeof pdfBase64 !== "string" || pdfBase64.trim().length === 0) {
      validationErrors.push("PDF base64 content is required and must be a non-empty string");
    }
    if (!pdfFilename || typeof pdfFilename !== "string" || pdfFilename.trim().length === 0) {
      validationErrors.push("PDF filename is required and must be a non-empty string");
    }
    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      validationErrors.push("Subject is required and must be a non-empty string");
    }

    if (validationErrors.length > 0) {
      console.log("❌ Validation failed:", validationErrors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Validate base64 string
    try {
      Buffer.from(pdfBase64.slice(0, 100), "base64");
    } catch (error) {
      console.error("Invalid base64 string:", error.message);
      return res.status(400).json({
        success: false,
        message: "Invalid PDF base64 content: " + error.message,
      });
    }

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("Nodemailer transporter verified successfully");
    } catch (error) {
      console.error("Nodemailer configuration error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to configure email service: " + error.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Email options with PDF attachment
    const mailOptions = {
      from: `"DAYA Consultancy Services" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: subject,
      text: `Dear ${recipientName},\n\nPlease find attached your ${subject}.\n\nBest regards,\nDAYA Consultancy Services`,
      attachments: [
        {
          filename: pdfFilename,
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${recipientEmail}, message ID: ${info.messageId}`);
      res.status(200).json({
        success: true,
        message: `Email with PDF attachment sent successfully to ${recipientEmail}`,
        messageId: info.messageId,
      });
    } catch (error) {
      console.error(`❌ Error sending email to ${recipientEmail}:`, error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to send email to ${recipientEmail}: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }
  })
);

// Error handling middleware
router.use((error, req, res, next) => {
  console.error("🚨 Email Router Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    timestamp: new Date().toISOString(),
  });
});

export default router;