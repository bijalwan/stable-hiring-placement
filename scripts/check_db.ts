import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { JobListing } from '../server/models/JobListing';
import { Testimonial } from '../server/models/Testimonial';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://vidishbijalwan2:vidishbijalwan2@stable.9wrxmyt.mongodb.net/?appName=stable';

async function check() {
    try {
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');

        const jobCount = await JobListing.countDocuments();
        console.log(`Job Listings: ${jobCount}`);
        const jobs = await JobListing.find().limit(2);
        console.log('Sample Jobs:', JSON.stringify(jobs, null, 2));

        const testimonialCount = await Testimonial.countDocuments();
        console.log(`Testimonials: ${testimonialCount}`);
        const testimonials = await Testimonial.find().limit(2);
        console.log('Sample Testimonials:', JSON.stringify(testimonials, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
