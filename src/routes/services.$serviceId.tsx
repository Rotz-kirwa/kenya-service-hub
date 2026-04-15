import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, Phone, MessageCircle, Share2, Heart, ChevronRight, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    const service = services.find((s) => s.id === params.serviceId);
    return {
      meta: [
        { title: service ? `${service.title} — HudumaHub` : "Service — HudumaHub" },
        { name: "description", content: service?.description ?? "" },
        { property: "og:title", content: service?.title ?? "Service" },
        { property: "og:description", content: service?.description ?? "" },
      ],
    };
  },
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-display">Service not found</h1>
        <Link to="/services" className="text-primary hover:underline mt-2 block">Browse all services</Link>
      </div>
    </div>
  ),
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;

  const related = services.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl overflow-hidden aspect-[16/9] mb-8"
            >
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary bg-gold-light px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
                {service.featured && (
                  <span className="text-xs font-medium text-secondary bg-emerald-light px-2.5 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl font-bold text-foreground mb-2">{service.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {service.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" /> {service.rating} ({service.reviews} reviews)
                </span>
              </div>

              <div className="prose prose-sm max-w-none mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We pride ourselves on delivering exceptional quality and customer satisfaction. With years of experience
                  serving clients across Kenya, our team brings professionalism, creativity, and dedication to every project.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, label: "Verified Vendor" },
                  { icon: Clock, label: "Quick Response" },
                  { icon: Star, label: "Top Rated" },
                  { icon: MessageCircle, label: "Free Consultation" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <f.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Pricing packages */}
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Pricing Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { name: "Basic", price: "KSh 15,000", features: ["3-hour session", "50 edited photos", "Online gallery"] },
                  { name: "Standard", price: "KSh 35,000", features: ["6-hour session", "150 edited photos", "Online gallery", "Print album"], highlight: true },
                  { name: "Premium", price: "KSh 75,000", features: ["Full day", "300+ photos", "Drone footage", "Print album", "Video highlight"] },
                ].map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`rounded-xl p-5 border ${pkg.highlight ? "border-primary bg-gold-light/30" : "border-border/50 bg-card"}`}
                  >
                    <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                    <div className="text-2xl font-bold font-display text-primary mt-1">{pkg.price}</div>
                    <ul className="mt-3 space-y-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={pkg.highlight ? "hero" : "outline"} size="sm" className="w-full mt-4 rounded-lg">
                      Choose Plan
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Vendor card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl p-6 border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full gold-gradient flex items-center justify-center text-foreground font-bold text-lg">
                    {service.vendor[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-card-foreground">{service.vendor}</span>
                      {service.vendorVerified && <BadgeCheck className="h-4 w-4 text-secondary" />}
                    </div>
                    <span className="text-xs text-muted-foreground">Active since 2022</span>
                  </div>
                </div>

                <div className="text-2xl font-bold font-display text-primary mb-1">{service.priceRange}</div>
                <span className="text-xs text-muted-foreground">Starting price</span>

                <div className="mt-5 space-y-2.5">
                  <Button variant="hero" className="w-full rounded-xl">
                    <Phone className="h-4 w-4" /> Contact Vendor
                  </Button>
                  <Button variant="emerald" className="w-full rounded-xl">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl">
                    Request a Quote
                  </Button>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Heart className="h-4 w-4" /> Save
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>
              </motion.div>

              {/* Safety */}
              <div className="bg-emerald-light rounded-xl p-5 border border-secondary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-sm text-foreground">Trust & Safety</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This vendor is verified by HudumaHub. We recommend communicating through our platform for your security.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
