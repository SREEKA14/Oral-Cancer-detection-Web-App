import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!file) {
      alert("Choose image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await API.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }

    setLoading(false);
  };

  const downloadReport = async () => {
    if (!result) {
      alert("No report available");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "oral_cancer_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Report download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
          <h2 className="text-3xl font-bold text-sky-700 mb-3">
            Upload Oral Image
          </h2>

          <p className="text-gray-500 mb-6">
            Upload a clear oral cavity image for AI-powered screening.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 p-4 rounded-xl mb-5"
          />

          <button
            onClick={handlePredict}
            className="w-full bg-sky-600 hover:bg-sky-700 transition text-white py-4 rounded-2xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>

        {/* Result Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
          <h2 className="text-3xl font-bold text-sky-700 mb-5">
            Prediction Result
          </h2>

          {!result ? (
            <div className="h-[250px] flex items-center justify-center text-gray-400">
              No prediction yet
            </div>
          ) : (
            <>
              <div
                className={`p-5 rounded-2xl mb-5 ${
                  result.prediction === "CANCER"
                    ? "bg-red-50"
                    : "bg-green-50"
                }`}
              >
                <p className="text-lg mb-2">
                  <b>Prediction:</b>{" "}
                  <span
                    className={
                      result.prediction === "CANCER"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {result.prediction}
                  </span>
                </p>

                <p className="text-lg">
                  <b>Confidence:</b> {result.confidence}%
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 text-slate-700">
                  Medical Recommendations
                </h3>

                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  {result.recommendation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <button
                  onClick={downloadReport}
                  className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-2xl font-semibold"
                >
                  Download Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}