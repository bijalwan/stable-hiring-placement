import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Monitor,
  DollarSign,
  Heart,
  Cog,
  Megaphone,
  Scale,
  Users,
  ShoppingBag,
  Palette,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const industries = [
  {
    icon: Monitor,
    name: "Technology & IT",
    description: "From software developers to IT managers, we help tech companies find innovative talent.",
    roles: ["Software Engineers", "Data Scientists", "DevOps Engineers", "Product Managers", "UI/UX Designers"],
    openings: 45,
  },
  {
    icon: DollarSign,
    name: "Finance & Accounting",
    description: "Connecting financial experts with leading banks, firms, and corporations.",
    roles: ["Financial Analysts", "Accountants", "CFOs", "Investment Bankers", "Risk Managers"],
    openings: 32,
  },
  {
    icon: Heart,
    name: "Healthcare & Life Sciences",
    description: "Staffing solutions for hospitals, clinics, and pharmaceutical companies.",
    roles: ["Medical Professionals", "Healthcare Administrators", "Pharmaceutical Reps", "Clinical Researchers", "Nurses"],
    openings: 28,
  },
  {
    icon: Cog,
    name: "Engineering & Manufacturing",
    description: "Finding skilled engineers and manufacturing experts for industrial growth.",
    roles: ["Mechanical Engineers", "Production Managers", "Quality Analysts", "Plant Managers", "Process Engineers"],
    openings: 35,
  },
  {
    icon: Megaphone,
    name: "Marketing & Sales",
    description: "Placing creative marketers and results-driven sales professionals.",
    roles: ["Marketing Managers", "Sales Executives", "Digital Marketers", "Brand Managers", "Business Development"],
    openings: 42,
  },
  {
    icon: Scale,
    name: "Legal & Compliance",
    description: "Expert placement for legal professionals and compliance officers.",
    roles: ["Corporate Lawyers", "Compliance Officers", "Legal Advisors", "Paralegals", "Contract Managers"],
    openings: 18,
  },
  {
    icon: Users,
    name: "Human Resources",
    description: "HR professionals who build great workplace cultures and teams.",
    roles: ["HR Managers", "Recruiters", "Training Specialists", "HR Business Partners", "Compensation Analysts"],
    openings: 22,
  },
  {
    icon: ShoppingBag,
    name: "Retail & Hospitality",
    description: "Staffing retail chains, hotels, and hospitality businesses with customer-focused talent.",
    roles: ["Store Managers", "Hotel Managers", "Customer Service Reps", "Operations Managers", "Event Coordinators"],
    openings: 30,
  },
  {
    icon: Palette,
    name: "Creative & Design",
    description: "Connecting creative agencies with talented designers and artists.",
    roles: ["Graphic Designers", "Art Directors", "Content Creators", "Copywriters", "Video Producers"],
    openings: 25,
  },
  {
    icon: GraduationCap,
    name: "Education & Training",
    description: "Placing educators and trainers in schools, colleges, and corporate settings.",
    roles: ["Teachers", "Corporate Trainers", "Academic Administrators", "E-Learning Specialists", "Curriculum Designers"],
    openings: 20,
  },
];

const Industries = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(filterParam);
  const { ref, isVisible } = useScrollAnimation();

  const selected = industries.find(i => i.name === selectedIndustry);

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
              Industries We Serve
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Expertise Across <span className="text-gradient">Every Sector</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              With deep industry knowledge and extensive networks, we provide specialized recruitment solutions across diverse sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionHeader
            badge="Select an Industry"
            title="Browse by Sector"
            description="Click on any industry to learn more about our specialized recruitment services."
          />

          <div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
          >
            {industries.map((industry, index) => (
              <button
                key={industry.name}
                onClick={() => setSelectedIndustry(selectedIndustry === industry.name ? null : industry.name)}
                className={cn(
                  "group relative bg-card rounded-xl p-4 text-center hover-lift shadow-sm border transition-all duration-500",
                  selectedIndustry === industry.name
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border/50 hover:border-primary/30",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={cn(
                  "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
                  selectedIndustry === industry.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                )}>
                  <industry.icon className="h-6 w-6" />
                </div>
                <h3 className={cn(
                  "font-medium text-sm mb-1 transition-colors",
                  selectedIndustry === industry.name ? "text-primary" : "text-foreground"
                )}>
                  {industry.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {industry.openings} openings
                </p>
              </button>
            ))}
          </div>

          {/* Selected Industry Details */}
          {selected && (
            <Card className="border-0 shadow-xl animate-scale-in overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <selected.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {selected.name}
                        </h2>
                        <p className="text-primary font-medium">{selected.openings} open positions</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {selected.description}
                    </p>
                    <h4 className="font-semibold text-foreground mb-4">Common Roles We Fill:</h4>
                    <ul className="space-y-2 mb-8">
                      {selected.roles.map((role, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{role}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild>
                        <Link to={`/careers?industry=${encodeURIComponent(selected.name)}`}>
                          View Open Positions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/contact">Contact Us</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative min-h-[300px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <selected.icon className="h-32 w-32 text-primary-foreground/30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!selected && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Select an industry above to see more details</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We serve many more sectors. Contact us to discuss your specific recruitment needs.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
