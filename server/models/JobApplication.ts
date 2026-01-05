import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cover_letter: { type: String },
    resume_url: { type: String },
    created_at: { type: Date, default: Date.now }
});

export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
