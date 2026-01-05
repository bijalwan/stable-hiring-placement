import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { JobListing } from './models/JobListing';
import { JobApplication } from './models/JobApplication';
import { ContactSubmission } from './models/ContactSubmission';
import { Testimonial } from './models/Testimonial';
import { Industry } from './models/Industry';
import { Service } from './models/Service';
import { Stat } from './models/Stat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vidishbijalwan2:vidishbijalwan2@stable.9wrxmyt.mongodb.net/?appName=stable';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes

// Job Listings
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await JobListing.find({ is_active: true }).sort({ created_at: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Job Applications
app.post('/api/applications', async (req, res) => {
    try {
        const application = new JobApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// Contact Submissions
app.post('/api/contact', async (req, res) => {
    try {
        const submission = new ContactSubmission(req.body);
        await submission.save();
        res.status(201).json(submission);
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ is_active: true }).sort({ created_at: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

// Industries
app.get('/api/industries', async (req, res) => {
    try {
        const industries = await Industry.find({ is_active: true }).sort({ name: 1 });
        res.json(industries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch industries' });
    }
});

// Services
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find({ is_active: true }).sort({ created_at: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Stats
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await Stat.find({ is_active: true }).sort({ order: 1 });
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
