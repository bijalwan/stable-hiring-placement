import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  job_type: { type: String, required: true },
  industry: { type: String, required: true },
  experience_level: { type: String, required: true },
  salary_range: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const JobListing = mongoose.model('JobListing', jobListingSchema);
