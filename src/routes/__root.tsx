import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-display text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Within Reach Services — Kenya's Premier Service Marketplace" },
      { name: "description", content: "Discover and hire trusted service providers across Kenya. From catering to photography, find the perfect professional for any job." },
      { name: "author", content: "Within Reach Services" },
      { name: "theme-color", content: "#C8930A" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Within Reach" },
      { name: "mobile-web-app-capable", content: "yes" },
      { property: "og:title", content: "Within Reach Services — Kenya's Premier Service Marketplace" },
      { property: "og:description", content: "Discover and hire trusted service providers across Kenya." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icon-192.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function WhatsAppButton() {
  const phone = "254719565618";
  const message = encodeURIComponent("Hello! I found you on Within Reach Services and I'd like to enquire about your services.");
  return (
    <>
      <style>{`
        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-4deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(4deg); }
        }
        @keyframes wa-ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes wa-ripple2 {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .wa-btn {
          animation: wa-bounce 2.4s ease-in-out infinite;
        }
        .wa-btn:hover {
          animation: none;
          transform: scale(1.12);
        }
        .wa-ring1 {
          animation: wa-ripple 2s ease-out infinite;
        }
        .wa-ring2 {
          animation: wa-ripple2 2s ease-out infinite 0.5s;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* ripple rings */}
        <span className="wa-ring1 absolute w-14 h-14 rounded-full" style={{ backgroundColor: "#25D366" }} />
        <span className="wa-ring2 absolute w-14 h-14 rounded-full" style={{ backgroundColor: "#25D366" }} />

        {/* tooltip */}
        <span className="absolute right-16 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ bottom: "14px" }}>
          Chat with us
        </span>

        <a
          href={`https://wa.me/${phone}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="wa-btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl cursor-pointer"
          style={{ backgroundColor: "#25D366" }}
        >
          {/* online dot */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: "#4ade80" }} />
          <svg viewBox="0 0 32 32" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.651 4.826 1.788 6.85L2 30l7.363-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.834-1.6l-.418-.248-4.368 1.05 1.08-4.252-.272-.435A11.467 11.467 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.351-1.118-.316-.115-.546-.172-.776.172-.23.344-.888 1.118-1.09 1.349-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.767-1.707-1.022-.912-1.712-2.037-1.913-2.381-.2-.344-.022-.53.15-.701.155-.154.344-.4.516-.602.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.562-.28-.673-.563-.582-.776-.593l-.66-.011c-.23 0-.602.086-.917.43s-1.204 1.176-1.204 2.867 1.233 3.324 1.405 3.554c.172.23 2.427 3.707 5.88 5.198.822.355 1.464.567 1.964.726.825.263 1.576.226 2.169.137.661-.099 2.036-.832 2.323-1.635.287-.803.287-1.49.2-1.635-.086-.143-.316-.23-.66-.4z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

function RootComponent() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
