import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Store the icon name as a string
    color: { type: String },
    features: [{ type: String }],
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

export const Service = mongoose.model('Service', serviceSchema);
