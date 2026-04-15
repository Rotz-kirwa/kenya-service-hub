import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Users, Target, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — HudumaHub" },
      { name: "description", content: "HudumaHub is Kenya's premier online marketplace connecting customers with trusted service providers." },
      { property: "og:title", content: "About HudumaHub" },
      { property: "og:description", content: "Connecting Kenya with trusted professionals since 2024." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Empowering Kenya's <span className="text-primary">Service Economy</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            HudumaHub was born from a simple idea: every talented service provider in Kenya deserves to be found. We're building Africa's most trusted marketplace where skills meet opportunity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Target, title: "Our Mission", text: "To connect every Kenyan with trusted, affordable service providers — effortlessly." },
            { icon: Users, title: "Community First", text: "50,000+ customers and 12,000+ vendors trust HudumaHub for their service needs." },
            { icon: Shield, title: "Trust & Safety", text: "Every vendor is vetted. Genuine reviews and secure payments protect our community." },
            { icon: Award, title: "Quality", text: "We champion excellence — only the best service providers earn featured status." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border/50 text-center hover-lift"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-primary mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="hero-gradient rounded-3xl p-10 lg:p-16 text-center">
          <h2 className="font-display text-3xl font-bold text-cream mb-4">Built for Kenya, Designed for Africa</h2>
          <p className="text-cream/70 max-w-2xl mx-auto leading-relaxed">
            From Nairobi to Mombasa, Kisumu to Eldoret — we're on a mission to digitize Africa's service economy, one vendor at a time. Join us in building the future of how services are discovered and delivered.
          </p>
        </div>
      </div>
    </div>
  );
}
