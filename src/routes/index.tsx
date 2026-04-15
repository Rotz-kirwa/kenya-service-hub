import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronRight, Shield, Zap, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { categories, services, locations } from "@/data/services";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-coral blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" /> Kenya's #1 Service Marketplace
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-tight">
            Find & Hire the Best
            <span className="block text-primary">Service Providers</span>
            in Kenya
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-xl leading-relaxed">
            From wedding photographers to plumbers — discover verified professionals, compare prices, and book instantly. Trusted by 50,000+ Kenyans.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 sm:w-48">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <select className="w-full bg-transparent outline-none text-sm text-foreground">
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <Button variant="hero" size="lg" className="rounded-xl px-8">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-cream/50">Popular:</span>
            {["Photography", "Catering", "Cleaning", "Event Planning", "Car Hire"].map((tag) => (
              <Link
                key={tag}
                to="/services"
                className="text-xs text-cream/60 hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "12K+", label: "Verified Vendors" },
            { value: "200+", label: "Service Categories" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary font-display">{stat.value}</div>
              <div className="text-sm text-cream/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Browse by Category</h2>
            <p className="text-muted-foreground mt-2">Explore 200+ service categories across Kenya</p>
          </div>
          <Link to="/categories" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/services"
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border/50 hover-lift text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-medium text-sm text-card-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-muted-foreground">{cat.count} services</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link to="/categories" className="text-sm font-medium text-primary hover:underline">
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedServicesSection() {
  const featured = services.filter((s) => s.featured);
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Services</h2>
            <p className="text-muted-foreground mt-2">Top-rated professionals handpicked for you</p>
          </div>
          <Link to="/services" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Browse All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse thousands of verified service providers by category, location, and budget.",
    },
    {
      icon: Users,
      title: "Compare & Choose",
      description: "Read reviews, compare prices, and view portfolios to find your perfect match.",
    },
    {
      icon: CheckCircle,
      title: "Book & Connect",
      description: "Contact vendors directly via WhatsApp, request quotes, or book instantly online.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified vendors, genuine reviews, and secure payments for peace of mind.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-foreground">How HudumaHub Works</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Finding and hiring the right service provider has never been easier
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-light text-primary mb-5">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold text-primary mb-2">Step {i + 1}</div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Grace Wanjiku",
      role: "Bride",
      text: "Found the most amazing wedding photographer through HudumaHub. The whole process was seamless — from browsing to booking. Highly recommend!",
      rating: 5,
    },
    {
      name: "James Ochieng",
      role: "Business Owner",
      text: "As a caterer, HudumaHub has tripled my client base. The featured listing really works! I now get 20+ inquiries weekly.",
      rating: 5,
    },
    {
      name: "Amina Hassan",
      role: "Homeowner",
      text: "Needed an emergency plumber at 9pm and found one within 30 minutes through HudumaHub. The verified badge gave me confidence to hire.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-foreground">What People Are Saying</h2>
          <p className="text-muted-foreground mt-2">Trusted by thousands of Kenyans</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border/50 hover-lift"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-card-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <div className="font-semibold text-sm text-card-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-primary blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-cream mb-4">
              Ready to Grow Your Service Business?
            </h2>
            <p className="text-cream/70 max-w-xl mx-auto mb-8">
              Join 12,000+ vendors who are reaching new customers every day on HudumaHub. Post your first listing for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" className="rounded-xl text-base px-8">
                Post a Service — It's Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="heroOutline" size="lg" className="rounded-xl text-base px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
