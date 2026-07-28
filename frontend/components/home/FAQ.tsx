"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is PropIntel AI?",
    answer:
      "PropIntel AI is an AI-powered real estate intelligence platform that helps buyers analyze properties using data-driven insights before making a purchase.",
  },
  {
    question: "Is PropIntel AI free to use?",
    answer:
      "Yes. The initial version provides free access to core features, with premium AI capabilities planned for future releases.",
  },
  {
    question: "Which property documents can I upload?",
    answer:
      "You will be able to upload sale deeds, agreements, property papers, images, and other supporting documents for AI-assisted analysis.",
  },
  {
    question: "Is my property data secure?",
    answer:
      "Yes. User privacy and data security are core priorities. Uploaded information is handled securely and is never shared without permission.",
  },
  {
    question: "Can PropIntel AI replace a legal advisor?",
    answer:
      "No. PropIntel AI provides AI-assisted insights to support decision-making. It should complement, not replace, professional legal or financial advice.",
  },
];
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
// FAQ.tsx
<section id="faq" className="scroll-mt-24 ...">
        <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-muted-foreground">
            Everything you need to know about PropIntel AI.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}