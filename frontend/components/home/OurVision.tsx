import { Brain, ShieldCheck, Zap, Globe } from "lucide-react";

const visionPoints = [
  {
    icon: Brain,
    title: "AI First",
    description:
      "Artificial Intelligence at the core of every property decision.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description:
      "Your documents and data remain private, secure and protected.",
  },
  {
    icon: Zap,
    title: "Fast Decisions",
    description:
      "Analyze properties in minutes instead of days of manual research.",
  },
  {
    icon: Globe,
    title: "Accessible for Everyone",
    description:
      "Making smart real estate decisions simple for every buyer and investor.",
  },
];

export default function OurVision() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600">
            Our Vision
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Building the Future of
            <span className="text-blue-600"> Real Estate Intelligence</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            We believe buying a property should be driven by data, transparency
            and intelligent insights—not uncertainty. PropIntel AI empowers
            buyers with AI-powered analysis to make confident real estate
            decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {visionPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-card p-8 transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                  <Icon className="text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}