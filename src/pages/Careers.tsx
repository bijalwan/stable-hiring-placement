import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  ArrowRight,
  Filter,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  industry: string;
  experience_level: string;
  salary_range: string | null;
  description: string;
  requirements: string[] | null;
  benefits: string[] | null;
  created_at: string;
}

const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["All Levels", "Entry-level", "Mid-level", "Senior", "Executive"];

const Careers = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [industries, setIndustries] = useState<string[]>(["All Industries"]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get("industry") || "All Industries");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsData, industriesData] = await Promise.all([
          api.getJobs(),
          api.getIndustries()
        ]);
        setJobs(jobsData);
        setIndustries(["All Industries", ...industriesData.map((i: any) => i.name)]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === "All Industries" || job.industry === selectedIndustry;
    const matchesType = selectedType === "All Types" || job.job_type === selectedType;
    const matchesLevel = selectedLevel === "All Levels" || job.experience_level === selectedLevel;

    return matchesSearch && matchesIndustry && matchesType && matchesLevel;
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsApplying(true);

    try {
      await api.submitApplication({
        job_id: selectedJob.id,
        name: applicationForm.name,
        email: applicationForm.email,
        phone: applicationForm.phone,
        cover_letter: applicationForm.coverLetter,
      });
    } catch (error) {
      setIsApplying(false);
      toast.error("Failed to submit application. Please try again.");
      return;
    }

    setIsApplying(false);

    toast.success("Application submitted successfully! We'll be in touch soon.");
    setApplicationForm({ name: "", email: "", phone: "", coverLetter: "" });
    setSelectedJob(null);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-muted via-background to-accent/30 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-fade-in">
              Career Opportunities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Find Your <span className="text-gradient">Dream Job</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Explore exciting career opportunities with top companies. Let us help you take the next step in your professional journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-card border-b sticky top-16 md:top-20 z-40">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-md animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                    <div className="h-4 bg-muted rounded w-full mb-4" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-20" />
                      <div className="h-6 bg-muted rounded w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find more opportunities.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedIndustry("All Industries");
                  setSelectedType("All Types");
                  setSelectedLevel("All Levels");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              ref={ref}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className={cn(
                    "border-0 shadow-md hover-lift cursor-pointer group transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{job.job_type}</Badge>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.experience_level}</span>
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="outline">{job.industry}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedJob(job)}>
                            View & Apply
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                            <DialogDescription className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              {job.company} • {job.location}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge>{job.job_type}</Badge>
                              <Badge variant="outline">{job.experience_level}</Badge>
                              <Badge variant="outline">{job.industry}</Badge>
                              {job.salary_range && <Badge variant="secondary">{job.salary_range}</Badge>}
                            </div>

                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Description</h4>
                              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                            </div>

                            {job.requirements && job.requirements.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  {job.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {job.benefits && job.benefits.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  {job.benefits.map((ben, i) => (
                                    <li key={i}>{ben}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <form onSubmit={handleApply} className="space-y-4 pt-4 border-t">
                              <h4 className="font-semibold text-foreground">Apply for this position</h4>
                              <div className="grid gap-4">
                                <div>
                                  <Label htmlFor="name">Full Name *</Label>
                                  <Input
                                    id="name"
                                    required
                                    value={applicationForm.name}
                                    onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Your full name"
                                  />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      required
                                      value={applicationForm.email}
                                      onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                                      placeholder="your@email.com"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                      id="phone"
                                      type="tel"
                                      required
                                      value={applicationForm.phone}
                                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                                      placeholder="+91 XXXXX XXXXX"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="coverLetter">Cover Letter</Label>
                                  <Textarea
                                    id="coverLetter"
                                    value={applicationForm.coverLetter}
                                    onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                                    placeholder="Tell us why you're a great fit for this role..."
                                    rows={4}
                                  />
                                </div>
                              </div>
                              <Button type="submit" className="w-full" disabled={isApplying}>
                                {isApplying ? "Submitting..." : "Submit Application"}
                              </Button>
                            </form>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Can't Find the Right Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Submit your resume and we'll match you with opportunities that fit your skills and aspirations.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Submit Your Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
