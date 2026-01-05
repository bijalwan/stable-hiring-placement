import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    avatar_url: { type: String },
    rating: { type: Number, default: 5 },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
