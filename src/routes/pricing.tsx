import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Star, Crown, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Promotions — Within Reach Services" },
      { name: "description", content: "Boost your service listing with premium promotions. Get more visibility and reach more customers." },
      { property: "og:description", content: "Affordable plans to grow your service business on Within Reach Services." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "KSh 0",
      period: "forever",
      description: "Get started with basic listing",
      icon: Star,
      features: [
        "1 active listing",
        "Basic profile",
        "Standard search placement",
        "Email support",
      ],
      variant: "outline" as const,
    },
    {
      name: "Pro Vendor",
      price: "KSh 1,500",
      period: "/month",
      description: "Everything you need to grow",
      icon: Zap,
      features: [
        "10 active listings",
        "Featured badge",
        "Priority search ranking",
        "Analytics dashboard",
        "WhatsApp integration",
        "Photo gallery (20 images)",
      ],
      variant: "hero" as const,
      popular: true,
    },
    {
      name: "Business",
      price: "KSh 5,000",
      period: "/month",
      description: "For established businesses",
      icon: Crown,
      features: [
        "Unlimited listings",
        "Homepage spotlight",
        "Verified business badge",
        "Advanced analytics",
        "Priority support",
        "Custom vendor page",
        "Promoted in categories",
        "API access",
      ],
      variant: "emerald" as const,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="font-display text-4xl font-bold text-foreground">
            Grow Your Business with <span className="text-primary">Within Reach Services</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Choose the plan that fits your business. Upgrade anytime as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-8 border relative ${
                plan.popular
                  ? "border-primary bg-gold-light/20 shadow-lg shadow-primary/10"
                  : "border-border/50 bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <plan.icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground">{plan.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} className="w-full rounded-xl">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
