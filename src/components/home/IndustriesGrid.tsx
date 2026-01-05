import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
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
} from "lucide-react";

const industries = [
  { icon: Monitor, name: "Technology & IT", jobs: 45 },
  { icon: DollarSign, name: "Finance & Accounting", jobs: 32 },
  { icon: Heart, name: "Healthcare & Life Sciences", jobs: 28 },
  { icon: Cog, name: "Engineering & Manufacturing", jobs: 35 },
  { icon: Megaphone, name: "Marketing & Sales", jobs: 42 },
  { icon: Scale, name: "Legal & Compliance", jobs: 18 },
  { icon: Users, name: "Human Resources", jobs: 22 },
  { icon: ShoppingBag, name: "Retail & Hospitality", jobs: 30 },
  { icon: Palette, name: "Creative & Design", jobs: 25 },
  { icon: GraduationCap, name: "Education & Training", jobs: 20 },
];

export function IndustriesGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <SectionHeader
          badge="Industries We Serve"
          title="Expertise Across Sectors"
          description="With deep industry knowledge and extensive networks, we provide specialized recruitment solutions across diverse sectors."
        />

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {industries.map((industry, index) => (
            <Link
              key={industry.name}
              to={`/industries?filter=${encodeURIComponent(industry.name)}`}
              className={cn(
                "group relative bg-card rounded-xl p-6 text-center hover-lift shadow-sm hover:shadow-lg border border-border/50 hover:border-primary/30 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <industry.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {industry.jobs} openings
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/industries">Explore All Industries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
