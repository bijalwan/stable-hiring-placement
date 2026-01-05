import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Users,
  Clock,
  Crown,
  Map,
  CheckCircle2,
  ArrowRight,
  FileSearch,
  UserCheck,
  Briefcase,
  LineChart,
} from "lucide-react";

const services = [
  {
    icon: Users,
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
    icon: Clock,
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
    icon: Crown,
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
    icon: Map,
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

const process = [
  {
    icon: FileSearch,
    title: "Requirement Analysis",
    description: "Deep dive into your hiring needs and company culture",
  },
  {
    icon: Users,
    title: "Candidate Sourcing",
    description: "Extensive search through our network and databases",
  },
  {
    icon: UserCheck,
    title: "Screening & Assessment",
    description: "Rigorous interviews and skill evaluations",
  },
  {
    icon: Briefcase,
    title: "Successful Placement",
    description: "Seamless onboarding and follow-up support",
  },
];

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();

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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Comprehensive <span className="text-gradient">Recruitment Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              We deliver personalized, strategic, and effective recruitment services that help businesses grow while offering candidates exciting opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div ref={servicesRef} className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={cn(
                  "border-0 shadow-lg overflow-hidden transition-all duration-700",
                  servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className={cn(
                    "grid lg:grid-cols-2 gap-0",
                    index % 2 === 1 && "lg:flex-row-reverse"
                  )}>
                    {/* Content */}
                    <div className={cn("p-8 md:p-12", index % 2 === 1 && "lg:order-2")}>
                      <div className={cn("w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 text-primary-foreground", service.color)}>
                        <service.icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild>
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Visual */}
                    <div className={cn(
                      "relative min-h-[300px] lg:min-h-full bg-gradient-to-br flex items-center justify-center",
                      service.color,
                      index % 2 === 1 && "lg:order-1"
                    )}>
                      <service.icon className="h-32 w-32 text-primary-foreground/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <SectionHeader
            badge="Our Process"
            title="How We Deliver Results"
            description="A streamlined approach to finding the perfect match for your organization."
          />

          <div
            ref={processRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "relative transition-all duration-500",
                  processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="border-0 shadow-md hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your <span className="text-primary">Perfect Match?</span>
          </h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Let us help you navigate the recruitment landscape with our expertise and personalized approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-background/30 text-background hover:bg-background/10">
              <Link to="/careers">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
