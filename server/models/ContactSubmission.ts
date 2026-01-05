import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
