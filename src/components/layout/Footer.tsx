import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Globe, MessageCircle, ExternalLink } from "lucide-react";

const footerLinks = {
  "For Customers": [
    { label: "Browse Services", to: "/services" },
    { label: "How It Works", to: "/about" },
    { label: "Help Center", to: "/contact" },
  ],
  "For Vendors": [
    { label: "Post a Service", to: "/services" },
    { label: "Pricing & Promotions", to: "/pricing" },
    { label: "Vendor Dashboard", to: "/services" },
    { label: "Success Stories", to: "/about" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy Policy", to: "/about" },
    { label: "Terms of Service", to: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gold-gradient">
                <span className="text-lg font-bold text-foreground">W</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Within Reach <span className="text-primary">Services</span>
              </span>
            </div>
            <p className="text-sm text-card/60 mb-6 leading-relaxed">
              Kenya's premier marketplace for discovering and promoting professional services. Connect with trusted vendors instantly.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-card/10 hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-sm mb-4 text-card/90">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-card/50 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 pt-8 border-t border-card/10 flex flex-wrap gap-6 items-center text-sm text-card/50">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Nairobi, Kenya
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> +254 700 000 000
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> hello@withinreach.co.ke
          </span>
          <span className="ml-auto">© 2026 Within Reach Services. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
