import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Our Services", path: "/services" },
  { name: "Industries", path: "/industries" },
  { name: "Current Openings", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
];

const services = [
  "Permanent Recruitment",
  "Temporary Staffing",
  "Executive Search",
  "Talent Mapping",
  "Workforce Planning",
];

const industries = [
  "Technology & IT",
  "Finance & Accounting",
  "Healthcare",
  "Engineering",
  "Marketing & Sales",
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-primary-foreground font-bold">
                SH
              </div>
              <div>
                <h3 className="font-semibold text-lg">Stable Hiring</h3>
                <p className="text-sm text-background/70">Placement Services</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              A premier recruitment agency dedicated to connecting top talent with leading organizations across various industries.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/80 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-background/80 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:9654680475" className="flex items-start gap-3 text-background/80 hover:text-primary transition-colors group">
                <Phone className="h-5 w-5 mt-0.5 text-primary" />
                <div className="text-sm">
                  <p>9654680475</p>
                  <p>01204740077</p>
                </div>
              </a>
              <a href="mailto:stablehiring@gmail.com" className="flex items-center gap-3 text-background/80 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">stablehiring@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-background/80">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm">
                  K-704 Aura Chimera, Rajnagar Extension, Ghaziabad 201017
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Stable Hiring Placement. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
