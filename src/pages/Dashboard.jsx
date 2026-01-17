import { useState } from "react";
import PatientForm from "../components/PatientForm";
import ImageUpload from "../components/ImageUpload";
import HeatmapViewer from "../components/HeatMapViewer";
import ResultPanel from "../components/ResultPanel";
import Disclaimer from "../components/Disclaimer";

export default function Dashboard() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      confidence: 87,
      explanation:
        "Grad-CAM visualization highlights regions of increased attention "
        + "within the selected anatomical area. These patterns are visually "
        + "significant and generated for demonstration purposes only.",
      xray_url: "https://via.placeholder.com/400x400.png?text=X-ray",
      heatmap_url: "https://via.placeholder.com/400x400.png?text=Heatmap",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Center Card */}
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl p-6 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            AI X-Ray Analysis System
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explainable Medical Imaging (Demo)
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <PatientForm formData={formData} setFormData={setFormData} />
          <ImageUpload formData={formData} setFormData={setFormData} />
        </div>

        {/* Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
        >
          Run AI Analysis
        </button>

        {/* Output */}
        <HeatmapViewer
          xray={result?.xray_url}
          heatmap={result?.heatmap_url}
        />

        <ResultPanel result={result} />

        <Disclaimer />
      </div>
    </div>
  );
}
