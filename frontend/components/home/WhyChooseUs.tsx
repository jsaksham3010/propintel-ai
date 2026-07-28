import {
  ShieldCheck,
  Clock3,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Reduce Legal Risk",
    description:
      "Identify missing documents, ownership issues and legal risks before purchasing.",
  },
  {
    icon: Clock3,
    title: "Save Time",
    description:
      "Analyze properties within minutes instead of spending weeks on manual verification.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Get intelligent recommendations based on market trends and property data.",
  },
  {
    icon: BadgeCheck,
    title: "Make Better Decisions",
    description:
      "Receive clear reports and confidence scores before investing your money.",
  },
];

export default function WhyChooseUs() {
  return (
    // WhyChooseUs.tsx
<section id="why-us" className="scroll-mt-24 ...">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose PropIntel AI?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Built to help homebuyers and investors make safer, faster and smarter
            real estate decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border bg-card p-8 transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                  <Icon className="text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold">
                  {reason.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}