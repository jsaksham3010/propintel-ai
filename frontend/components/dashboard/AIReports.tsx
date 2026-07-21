import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const reports = [
  {
    id: "1",
    property: "Luxury Apartment",
    score: "92%",
    condition: "Excellent",
    risk: "Low",
    maintenance: "Low",
  },
  {
    id: "2",
    property: "Modern Villa",
    score: "86%",
    condition: "Good",
    risk: "Medium",
    maintenance: "Moderate",
  },
];

export default function AIReports() {
  return (
    <div className="mt-10">

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              AI Inspection Reports
            </h2>
          </div>

          <p className="text-gray-500 mt-1">
            Gemini powered property analysis
          </p>
        </div>

        <Link
          href="/reports"
          className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          View Reports
          <ArrowRight size={18} />
        </Link>
      </div>


      <div className="grid gap-6 md:grid-cols-2">

        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
          >

            <h3 className="text-xl font-semibold text-gray-900">
              {report.property}
            </h3>


            {/* Score */}
            <div className="mt-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Overall Score
                </p>

                <p className="text-3xl font-bold text-blue-600">
                  {report.score}
                </p>
              </div>


              <div className="rounded-xl bg-blue-50 p-3">
                <Sparkles className="text-blue-600" />
              </div>

            </div>


            {/* Details */}
            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  Condition
                </span>

                <span className="font-medium text-green-600">
                  {report.condition}
                </span>
              </div>


              <div className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <ShieldCheck size={16}/>
                  Risk
                </span>

                <span className="font-medium text-green-600">
                  {report.risk}
                </span>
              </div>


              <div className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <IndianRupee size={16}/>
                  Maintenance
                </span>

                <span className="font-medium text-gray-900">
                  {report.maintenance}
                </span>
              </div>

            </div>


            <Link
              href={`/reports/${report.id}`}
              className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium"
            >
              View Full Report
              <ArrowRight size={16}/>
            </Link>


          </div>
        ))}

      </div>

    </div>
  );
}