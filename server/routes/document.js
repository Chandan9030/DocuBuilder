import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  templateType: {
    type: String,
    required: true,
    enum: ['internshipLetter', 'offerLetter', 'certificate', 'experienceCertificate',"relievingLetter", "exitFormalityFinal", "hikeLetter", "salarySlip"],
    message: 'Template type must be internshipLetter, offerLetter, certificate, experienceCertificate,  relievingLetter, exitFormalityFinal, hikeLetter or salarySlip'
  },
  formData: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
documentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Document', documentSchema);