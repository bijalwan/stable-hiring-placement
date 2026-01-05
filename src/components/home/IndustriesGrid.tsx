import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import * as LucideIcons from "lucide-react";

const IconMap: Record<string, any> = {
  Monitor: LucideIcons.Monitor,
  DollarSign: LucideIcons.DollarSign,
  Heart: LucideIcons.Heart,
  Cog: LucideIcons.Cog,
  Megaphone: LucideIcons.Megaphone,
  Scale: LucideIcons.Scale,
  Users: LucideIcons.Users,
  ShoppingBag: LucideIcons.ShoppingBag,
  Palette: LucideIcons.Palette,
  GraduationCap: LucideIcons.GraduationCap,
};

export function IndustriesGrid() {
  const [industries, setIndustries] = useState<any[]>([]);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    async function fetchIndustries() {
      try {
        const data = await api.getIndustries();
        setIndustries(data);
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    }
    fetchIndustries();
  }, []);

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
          {industries.map((industry, index) => {
            const IconComponent = IconMap[industry.icon] || LucideIcons.HelpCircle;
            return (
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
                  <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {industry.jobs} openings
                </p>
              </Link>
            );
          })}
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
