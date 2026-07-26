interface AIReportProps {
  report?: {
    overallScore: number;
    constructionQuality: string;
    paintCondition: string;
    leakage: string;
    cracks: string;
    recommendations: string[];
  };
}

export default function AIReport({
  report,
}: AIReportProps) {
  if (!report) {
    return (
      <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-4">
          AI Inspection Report
        </h2>

        <div className="border-2 border-dashed rounded-2xl p-12 text-center">
          <p className="text-gray-500">
            No AI report available.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Upload property images and run AI Analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        AI Inspection Report
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-gray-500">
            Overall Score
          </p>

          <h3 className="text-4xl font-bold text-green-600 mt-2">
            {report.overallScore}/100
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">
            Construction Quality
          </p>

          <h3 className="font-semibold mt-2">
            {report.constructionQuality}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">
            Paint Condition
          </p>

          <h3 className="font-semibold mt-2">
            {report.paintCondition}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">
            Leakage
          </p>

          <h3 className="font-semibold mt-2">
            {report.leakage}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">
            Cracks
          </p>

          <h3 className="font-semibold mt-2">
            {report.cracks}
          </h3>
        </div>

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold mb-4">
          AI Recommendations
        </h3>

        <ul className="space-y-3">
          {report.recommendations.map((item, index) => (
            <li
              key={index}
              className="bg-blue-50 rounded-xl p-4"
            >
              • {item}
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}