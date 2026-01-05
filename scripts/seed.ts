import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Industry } from '../server/models/Industry';
import { Service } from '../server/models/Service';
import { Stat } from '../server/models/Stat';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI || 'mongodb+srv://vidishbijalwan2:vidishbijalwan2@stable.9wrxmyt.mongodb.net/?appName=stable';

const industries = [
    {
        icon: "Monitor",
        name: "Technology & IT",
        description: "From software developers to IT managers, we help tech companies find innovative talent.",
        roles: ["Software Engineers", "Data Scientists", "DevOps Engineers", "Product Managers", "UI/UX Designers"],
        jobs: 45,
    },
    {
        icon: "DollarSign",
        name: "Finance & Accounting",
        description: "Connecting financial experts with leading banks, firms, and corporations.",
        roles: ["Financial Analysts", "Accountants", "CFOs", "Investment Bankers", "Risk Managers"],
        jobs: 32,
    },
    {
        icon: "Heart",
        name: "Healthcare & Life Sciences",
        description: "Staffing solutions for hospitals, clinics, and pharmaceutical companies.",
        roles: ["Medical Professionals", "Healthcare Administrators", "Pharmaceutical Reps", "Clinical Researchers", "Nurses"],
        jobs: 28,
    },
    {
        icon: "Cog",
        name: "Engineering & Manufacturing",
        description: "Finding skilled engineers and manufacturing experts for industrial growth.",
        roles: ["Mechanical Engineers", "Production Managers", "Quality Analysts", "Plant Managers", "Process Engineers"],
        jobs: 35,
    },
    {
        icon: "Megaphone",
        name: "Marketing & Sales",
        description: "Placing creative marketers and results-driven sales professionals.",
        roles: ["Marketing Managers", "Sales Executives", "Digital Marketers", "Brand Managers", "Business Development"],
        jobs: 42,
    },
    {
        icon: "Scale",
        name: "Legal & Compliance",
        description: "Expert placement for legal professionals and compliance officers.",
        roles: ["Corporate Lawyers", "Compliance Officers", "Legal Advisors", "Paralegals", "Contract Managers"],
        jobs: 18,
    },
    {
        icon: "Users",
        name: "Human Resources",
        description: "HR professionals who build great workplace cultures and teams.",
        roles: ["HR Managers", "Recruiters", "Training Specialists", "HR Business Partners", "Compensation Analysts"],
        jobs: 22,
    },
    {
        icon: "ShoppingBag",
        name: "Retail & Hospitality",
        description: "Staffing retail chains, hotels, and hospitality businesses with customer-focused talent.",
        roles: ["Store Managers", "Hotel Managers", "Customer Service Reps", "Operations Managers", "Event Coordinators"],
        jobs: 30,
    },
    {
        icon: "Palette",
        name: "Creative & Design",
        description: "Connecting creative agencies with talented designers and artists.",
        roles: ["Graphic Designers", "Art Directors", "Content Creators", "Copywriters", "Video Producers"],
        jobs: 25,
    },
    {
        icon: "GraduationCap",
        name: "Education & Training",
        description: "Placing educators and trainers in schools, colleges, and corporate settings.",
        roles: ["Teachers", "Corporate Trainers", "Academic Administrators", "E-Learning Specialists", "Curriculum Designers"],
        jobs: 20,
    },
];

const services = [
    {
        icon: "Users",
        title: "Permanent Recruitment",
        description: "We connect clients with top candidates for full-time roles across various sectors, ensuring long-term success for both employers and employees.",
        features: [
            "Comprehensive candidate screening",
            "Cultural fit assessment",
            "Skills and experience verification",
            "Reference checks included",
            "90-day replacement guarantee",
        ],
        color: "from-primary to-primary/70",
    },
    {
        icon: "Clock",
        title: "Temporary & Contract Staffing",
        description: "We provide flexible staffing solutions for businesses needing short-term or project-based hires, allowing for scalability and agility in operations.",
        features: [
            "Quick turnaround time",
            "Flexible contract terms",
            "Payroll management included",
            "Compliance handled by us",
            "Easy contract extensions",
        ],
        color: "from-secondary to-secondary/70",
    },
    {
        icon: "Crown",
        title: "Executive Search",
        description: "For high-level executive and leadership positions, we leverage our vast network and industry expertise to find top-tier talent that aligns with your organizational goals.",
        features: [
            "Confidential search process",
            "C-suite and director-level focus",
            "Industry-specific expertise",
            "Thorough vetting process",
            "Leadership assessment included",
        ],
        color: "from-brand-lavender to-brand-lavender/70",
    },
    {
        icon: "Map",
        title: "Talent Mapping & Workforce Planning",
        description: "We assist businesses in planning for future talent needs, ensuring a pipeline of skilled professionals ready to meet changing demands.",
        features: [
            "Market intelligence reports",
            "Competitor talent analysis",
            "Succession planning support",
            "Skills gap analysis",
            "Long-term hiring roadmap",
        ],
        color: "from-brand-peach to-brand-peach/70",
    },
];

const stats = [
    { icon: "Users", value: "5000+", label: "Candidates Placed", order: 1 },
    { icon: "Building2", value: "500+", label: "Partner Companies", order: 2 },
    { icon: "Award", value: "10+", label: "Years Experience", order: 3 },
    { icon: "TrendingUp", value: "98%", label: "Success Rate", order: 4 },
];

async function seed() {
    try {
        await mongoose.connect(mongodbUri);
        console.log('Connected to MongoDB');

        console.log('Seeding Industries...');
        await Industry.deleteMany({});
        await Industry.insertMany(industries);
        console.log(`Seeded ${industries.length} industries`);

        console.log('Seeding Services...');
        await Service.deleteMany({});
        await Service.insertMany(services);
        console.log(`Seeded ${services.length} services`);

        console.log('Seeding Stats...');
        await Stat.deleteMany({});
        await Stat.insertMany(stats);
        console.log(`Seeded ${stats.length} stats`);

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
