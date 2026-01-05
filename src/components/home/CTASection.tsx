import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-foreground text-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
            Ready to Get Started?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let Us Help You Find the <span className="text-primary">Right Fit</span>
          </h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Whether you're looking to hire exceptional talent or explore exciting career opportunities, Stable Hiring Placement is here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-background/30 text-background hover:bg-background/10">
              <Link to="/careers">View Open Positions</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-background/10">
            <a
              href="tel:9654680475"
              className="flex items-center gap-2 text-background/80 hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>9654680475</span>
            </a>
            <a
              href="mailto:stablehiring@gmail.com"
              className="flex items-center gap-2 text-background/80 hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>stablehiring@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
