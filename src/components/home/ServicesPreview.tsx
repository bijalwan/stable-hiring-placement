import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Users, Clock, Crown, Map, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Permanent Recruitment",
    description: "Connect with top candidates for full-time roles across various sectors, ensuring long-term success for employers and employees.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "Temporary & Contract Staffing",
    description: "Flexible staffing solutions for businesses needing short-term or project-based hires, allowing scalability and agility.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Crown,
    title: "Executive Search",
    description: "For high-level executive positions, we leverage our vast network to find top-tier talent aligned with your organizational goals.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Map,
    title: "Talent Mapping & Planning",
    description: "Assist businesses in planning for future talent needs, ensuring a pipeline of skilled professionals ready for changing demands.",
    color: "bg-brand-peach/30 text-foreground",
  },
];

export function ServicesPreview() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <SectionHeader
          badge="Our Services"
          title="Tailored Recruitment Solutions"
          description="We deliver personalized, strategic, and effective recruitment services that help businesses grow while offering candidates exciting career opportunities."
        />

        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={cn(
                "group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", service.color)}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
