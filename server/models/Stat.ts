import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

export const Stat = mongoose.model('Stat', statSchema);
