import { Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Prop<span className="text-blue-600">Intel</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              AI-powered real estate intelligence platform helping buyers make
              smarter, safer and data-driven property decisions.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="cursor-pointer transition hover:text-foreground">
                Features
              </li>
              <li className="cursor-pointer transition hover:text-foreground">
                How It Works
              </li>
              <li className="cursor-pointer transition hover:text-foreground">
                FAQ
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="cursor-pointer transition hover:text-foreground">
                About
              </li>
              <li className="cursor-pointer transition hover:text-foreground">
                Contact
              </li>
              <li className="cursor-pointer transition hover:text-foreground">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>

            <div className="space-y-4 text-sm text-muted-foreground">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>contact@propintel.ai</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>India</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>www.propintel.ai</span>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PropIntel AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}