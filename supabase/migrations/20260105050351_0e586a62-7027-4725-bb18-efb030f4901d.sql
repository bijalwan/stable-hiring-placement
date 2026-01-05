-- Create contact_submissions table for storing contact form inquiries
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for contact_submissions (public can insert, only authenticated can read)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact form
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Create job_listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  industry TEXT NOT NULL,
  experience_level TEXT NOT NULL DEFAULT 'Mid-level',
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for job_listings
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active job listings
CREATE POLICY "Anyone can view active jobs"
ON public.job_listings
FOR SELECT
USING (is_active = true);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit job applications
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active testimonials
CREATE POLICY "Anyone can view active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Insert sample job listings
INSERT INTO public.job_listings (title, company, location, job_type, industry, experience_level, salary_range, description, requirements, benefits) VALUES
('Senior Software Engineer', 'TechCorp Solutions', 'Ghaziabad, UP', 'Full-time', 'Technology & IT', 'Senior', '₹15-25 LPA', 'We are looking for a skilled Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable software solutions.', ARRAY['5+ years of software development experience', 'Proficiency in React, Node.js, or Python', 'Strong problem-solving skills', 'Experience with cloud platforms (AWS/GCP)'], ARRAY['Health insurance', 'Flexible working hours', 'Remote work options', 'Professional development allowance']),
('Finance Manager', 'Global Finance Ltd', 'Delhi NCR', 'Full-time', 'Finance & Accounting', 'Senior', '₹18-28 LPA', 'Seeking an experienced Finance Manager to oversee financial operations, budgeting, and strategic planning for our growing organization.', ARRAY['MBA in Finance or CA qualified', '8+ years in financial management', 'Strong analytical skills', 'Experience with ERP systems'], ARRAY['Performance bonuses', 'Health coverage', 'Company car', 'Stock options']),
('Healthcare Administrator', 'MediCare Plus', 'Noida, UP', 'Full-time', 'Healthcare & Life Sciences', 'Mid-level', '₹8-12 LPA', 'Join our healthcare team as an Administrator to manage daily operations and ensure smooth functioning of our medical facility.', ARRAY['Bachelor''s degree in Healthcare Administration', '3+ years in healthcare management', 'Knowledge of medical regulations', 'Strong communication skills'], ARRAY['Medical benefits', 'Paid time off', 'Training opportunities', 'Meal allowance']),
('Marketing Executive', 'Brand Builders Inc', 'Gurugram, HR', 'Full-time', 'Marketing & Sales', 'Entry-level', '₹5-8 LPA', 'Looking for a creative Marketing Executive to develop and execute marketing campaigns across digital and traditional channels.', ARRAY['Bachelor''s degree in Marketing', '1-2 years of marketing experience', 'Proficiency in digital marketing tools', 'Creative mindset'], ARRAY['Performance incentives', 'Learning opportunities', 'Team outings', 'Flexible schedule']),
('HR Business Partner', 'People First Corp', 'Ghaziabad, UP', 'Full-time', 'Human Resources', 'Mid-level', '₹10-15 LPA', 'We are hiring an HR Business Partner to align HR strategies with business objectives and drive organizational development.', ARRAY['MBA in HR or equivalent', '5+ years in HR roles', 'Strong interpersonal skills', 'Experience with HRIS systems'], ARRAY['Health insurance', 'Annual bonus', 'Work from home', 'Employee wellness programs']);

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, company, content, rating) VALUES
('Rajesh Kumar', 'HR Director', 'TechVision India', 'Stable Hiring Placement helped us find exceptional talent for our tech team. Their understanding of our requirements and quick turnaround was impressive. Highly recommended!', 5),
('Priya Sharma', 'Software Developer', 'DataTech Solutions', 'I found my dream job through Stable Hiring. The team was supportive throughout the process and matched me with the perfect opportunity. Thank you!', 5),
('Amit Patel', 'CEO', 'GrowthFirst Startups', 'As a startup, finding the right talent is crucial. Stable Hiring understood our unique needs and delivered candidates who fit our culture perfectly.', 5),
('Sneha Reddy', 'Finance Head', 'Capital Ventures', 'Professional, efficient, and results-driven. Stable Hiring filled our critical finance positions within weeks. Outstanding service!', 5),
('Vikram Singh', 'Operations Manager', 'LogiPro Services', 'The team at Stable Hiring goes above and beyond. They took time to understand our business and found candidates who exceeded our expectations.', 5);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for job_listings
CREATE TRIGGER update_job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();