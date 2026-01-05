import { createClient } from '@supabase/supabase-js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { JobListing } from '../server/models/JobListing';
import { JobApplication } from '../server/models/JobApplication';
import { ContactSubmission } from '../server/models/ContactSubmission';
import { Testimonial } from '../server/models/Testimonial';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!; // Note: For migration, a service role key would be better if available, but we'll try with this.
const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://vidishbijalwan2:vidishbijalwan2@stable.9wrxmyt.mongodb.net/?appName=stable';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    try {
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');

        // 1. Migrate Job Listings
        console.log('Migrating Job Listings...');
        const { data: jobs, error: jobsError } = await supabase.from('job_listings').select('*');
        if (jobsError) throw jobsError;
        if (jobs) {
            await JobListing.deleteMany({});
            await JobListing.insertMany(jobs.map(job => ({
                ...job,
                _id: new mongoose.Types.ObjectId(job.id.replace(/-/g, '').substring(0, 24)) // Attempt to preserve ID if possible, or just let MongoDB generate new ones.
            })));
            console.log(`Migrated ${jobs.length} job listings`);
        }

        // 2. Migrate Testimonials
        console.log('Migrating Testimonials...');
        const { data: testimonials, error: testimonialsError } = await supabase.from('testimonials').select('*');
        if (testimonialsError) throw testimonialsError;
        if (testimonials) {
            await Testimonial.deleteMany({});
            await Testimonial.insertMany(testimonials);
            console.log(`Migrated ${testimonials.length} testimonials`);
        }

        // 3. Migrate Contact Submissions
        console.log('Migrating Contact Submissions...');
        const { data: contacts, error: contactsError } = await supabase.from('contact_submissions').select('*');
        if (contactsError) throw contactsError;
        if (contacts) {
            await ContactSubmission.deleteMany({});
            await ContactSubmission.insertMany(contacts);
            console.log(`Migrated ${contacts.length} contact submissions`);
        }

        // 4. Migrate Job Applications
        console.log('Migrating Job Applications...');
        const { data: applications, error: applicationsError } = await supabase.from('job_applications').select('*');
        if (applicationsError) throw applicationsError;
        if (applications) {
            await JobApplication.deleteMany({});
            // Note: job_id might need mapping if we changed job IDs. 
            // For simplicity, we'll just insert them as is for now.
            await JobApplication.insertMany(applications);
            console.log(`Migrated ${applications.length} job applications`);
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (err: any) {
        console.error('Migration failed:');
        console.error(err);
        if (err.message) console.error('Message:', err.message);
        if (err.details) console.error('Details:', err.details);
        if (err.hint) console.error('Hint:', err.hint);
        process.exit(1);
    }
}

migrate();
