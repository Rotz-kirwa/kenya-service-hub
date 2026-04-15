import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories } from "@/data/services";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Service Categories — HudumaHub" },
      { name: "description", content: "Explore all service categories on HudumaHub. Find the right professional for any task." },
      { property: "og:title", content: "Service Categories — HudumaHub" },
      { property: "og:description", content: "Browse 200+ service categories across Kenya." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-muted/30 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">All Categories</h1>
          <p className="text-muted-foreground mt-2">Explore {categories.length} service categories across Kenya</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to="/services"
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 hover-lift"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">{cat.count} services</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
