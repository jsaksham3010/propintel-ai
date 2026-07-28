import {
  Upload,
  Brain,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Property Details",
    description:
      "Upload property documents, images and basic information for AI analysis.",
  },
  {
    icon: Brain,
    title: "AI Processes Everything",
    description:
      "Our AI analyzes legal documents, property images, market trends and potential risks.",
  },
  {
    icon: BarChart3,
    title: "Receive Smart Insights",
    description:
      "Get investment score, fraud detection, builder reputation and ROI predictions.",
  },
  {
    icon: CheckCircle2,
    title: "Make a Confident Decision",
    description:
      "Review the complete AI report and make informed real estate decisions.",
  },
];

export default function HowItWorks() {
  return (
<section id="how-it-works" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How PropIntel AI Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Analyze any property in four simple steps using the power of AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border bg-card p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
                  <Icon className="text-blue-600" />
                </div>

                <div className="mb-3 text-sm font-semibold text-blue-600">
                  Step {index + 1}
                </div>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}