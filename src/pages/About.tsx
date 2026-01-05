import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Target, Eye, Award, Users, CheckCircle2, Building2 } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every placement, ensuring the perfect match between talent and opportunity.",
  },
  {
    icon: Users,
    title: "Relationships",
    description: "Building lasting relationships with clients and candidates based on trust and mutual success.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Operating with transparency, honesty, and ethical practices in all our interactions.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Continuously evolving our methods to stay ahead in the dynamic recruitment landscape.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understanding Requirements",
    description: "We begin by thoroughly understanding your hiring needs, company culture, and role specifications.",
  },
  {
    step: "02",
    title: "Candidate Sourcing",
    description: "Leveraging our extensive network and database to identify potential candidates who match your criteria.",
  },
  {
    step: "03",
    title: "Rigorous Screening",
    description: "Candidates undergo thorough interviews, skill assessments, and background verification.",
  },
  {
    step: "04",
    title: "Client Presentation",
    description: "Shortlisted candidates are presented with detailed profiles including interview ratings and recommendations.",
  },
  {
    step: "05",
    title: "Interview Coordination",
    description: "We facilitate the interview process and provide feedback to both parties throughout.",
  },
  {
    step: "06",
    title: "Successful Placement",
    description: "Supporting the onboarding process and maintaining relationships for future success.",
  },
];

const About = () => {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Your Trusted <span className="text-gradient">Recruitment Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Stable Hiring Placement is a premier recruitment agency dedicated to connecting top talent with leading organizations across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div
            ref={missionRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-700",
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Card className="border-0 shadow-lg bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-primary-foreground/90 leading-relaxed">
                  Our mission is to simplify the recruitment process by bridging the gap between exceptional talent and companies seeking the right fit. We strive to deliver personalized, strategic, and effective recruitment services that help businesses grow while offering candidates exciting opportunities for career development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-secondary text-secondary-foreground overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 rounded-xl bg-secondary-foreground/20 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-secondary-foreground/90 leading-relaxed">
                  To become the most trusted recruitment partner in India, known for our commitment to excellence, innovation, and the lasting success of both our clients and candidates. We envision a world where every professional finds their perfect career match.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <SectionHeader
            badge="Our Values"
            title="What Drives Us"
            description="Our core values guide every decision we make and every placement we facilitate."
          />

          <div
            ref={valuesRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={cn(
                  "border-0 shadow-md hover-lift text-center transition-all duration-500",
                  valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionHeader
            badge="How We Work"
            title="Our Recruitment Process"
            description="A systematic approach ensuring we find candidates who are the right fit for your organization."
          />

          <div
            ref={processRef}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 transition-all duration-500",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step number */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 -translate-x-1/2 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                {/* Content */}
                <div className={cn("flex-1 pl-20 md:pl-0", index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16")}>
                  <Card className="border-0 shadow-md hover-lift">
                    <CardContent className="p-6">
                      <span className="text-4xl font-bold text-primary/20">{step.step}</span>
                      <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Success Through <span className="text-primary">Strategic Partnerships</span>
              </h2>
              <p className="text-background/80 mb-8 leading-relaxed">
                With years of experience and a commitment to excellence, we have built a solid reputation for reliability, professionalism, and success in the recruitment industry.
              </p>

              <div className="space-y-4">
                {[
                  "Customized staffing strategies for companies of all sizes",
                  "From startups to multinational corporations",
                  "Deep understanding of industry-specific requirements",
                  "Extensive network of pre-screened candidates",
                  "Quick turnaround without compromising quality",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-background/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Partner Companies" },
                { value: "5000+", label: "Placements Made" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10+", label: "Years Experience" },
              ].map((stat, index) => (
                <Card key={index} className="border-0 bg-background/5 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-background/70">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
