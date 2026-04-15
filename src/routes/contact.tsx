import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronDown } from "lucide-react";
import { categories } from "@/data/services";

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

const WA_NUMBER = "254719565618";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    subject: "",
    message: "",
  });

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Hello HudumaHub! 👋`,
      ``,
      `*Name:* ${form.name || "—"}`,
      `*Email:* ${form.email || "—"}`,
      form.service ? `*Service Interested In:* ${form.service}` : null,
      form.subject ? `*Subject:* ${form.subject}` : null,
      ``,
      `*Message:*`,
      form.message || "—",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background text-sm outline-none focus:border-primary transition-colors";

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
              { icon: Phone, title: "Phone", text: "+254 719 565618" },
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
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="emerald" className="w-full rounded-xl mt-4">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-8 border border-border/50"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Service dropdown */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Service you're interested in <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={set("service")}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">— Select a service —</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us more..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </Button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
