import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { services, categories, locations } from "@/data/services";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Browse Services — HudumaHub" },
      { name: "description", content: "Explore thousands of verified service providers across Kenya. Filter by category, location, and budget." },
      { property: "og:title", content: "Browse Services — HudumaHub" },
      { property: "og:description", content: "Find trusted professionals for any service in Kenya." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-muted/50 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Browse Services</h1>
          <p className="text-muted-foreground mt-1">Discover {services.length}+ verified service providers across Kenya</p>

          {/* Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/50 sm:w-44">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <select className="w-full bg-transparent outline-none text-sm">
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Category pills */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                All
              </button>
              {categories.slice(0, 10).map((cat) => (
                <button
                  key={cat.slug}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">{services.length} services found</span>
          <select className="text-sm bg-transparent outline-none text-muted-foreground">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: Highest</option>
            <option>Most Reviews</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
