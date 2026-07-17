import {
  Brain,
  FileCheck,
  ShieldCheck,
  BarChart3,
  Building2,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Property Analysis",
    description:
      "Get instant insights about any property using advanced AI models.",
  },
  {
    icon: FileCheck,
    title: "Legal Document Review",
    description:
      "Upload property documents and detect missing clauses or legal risks.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    description:
      "Identify fraud indicators, builder reputation and ownership risks.",
  },
  {
    icon: BarChart3,
    title: "Investment Score",
    description:
      "Evaluate ROI potential with AI-driven market analysis.",
  },
  {
    icon: Building2,
    title: "Builder Intelligence",
    description:
      "Analyze builders based on project history and customer reviews.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Ask questions about any property and receive instant AI guidance.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Powerful AI Features
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need before making one of the biggest financial
            decisions of your life.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                  <Icon className="text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}