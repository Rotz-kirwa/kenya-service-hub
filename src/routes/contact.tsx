import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — HudumaHub" },
      { name: "description", content: "Get in touch with HudumaHub. We're here to help customers and vendors." },
      { property: "og:title", content: "Contact HudumaHub" },
      { property: "og:description", content: "Reach out — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="font-display text-4xl font-bold text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Office", text: "Westlands, Nairobi, Kenya" },
              { icon: Phone, title: "Phone", text: "+254 700 000 000" },
              { icon: Mail, title: "Email", text: "hello@hudumahub.co.ke" },
              { icon: Clock, title: "Hours", text: "Mon - Fri, 8am - 6pm EAT" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-light text-primary shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.text}</div>
                </div>
              </div>
            ))}
            <Button variant="emerald" className="w-full rounded-xl mt-4">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </Button>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-8 border border-border/50"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full rounded-xl">
                Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
