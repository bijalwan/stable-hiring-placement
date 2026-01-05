import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String },
    roles: [{ type: String }],
    jobs: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

export const Industry = mongoose.model('Industry', industrySchema);
