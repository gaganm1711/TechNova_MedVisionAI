import { useState } from "react";
import PatientForm from "../components/PatientForm";
import ImageUpload from "../components/ImageUpload";
import HeatmapViewer from "../components/HeatmapViewer";
import ResultPanel from "../components/ResultPanel";
import Disclaimer from "../components/Disclaimer";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setResult({
      confidence: 87,
      explanation:
        "Grad-CAM visualization highlights clinically relevant regions " +
        "to support explainable medical imaging analysis.",
      xray_url: "https://via.placeholder.com/400x400.png?text=X-ray",
      heatmap_url: "https://via.placeholder.com/400x400.png?text=Heatmap",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">

      {/* ================= HERO SECTION ================= */}
      <section className="px-8 py-24 bg-gradient-to-b from-[#020617] via-[#0b1d33] to-[#020617]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              
              <span className="text-cyan-400">MedVision AI</span>
              
            </h1>

            <p className="text-slate-300 max-w-xl">
              MedVision AI assists Doctors and clinicians by analyzing
              medical images using advanced computer vision, confidence-based
              reasoning, and explainable AI — designed for real-world
              healthcare workflows.
            </p>

            
          </div>

          
        </div>
      </section>

      {/* ================= DASHBOARD SECTION ================= */}
      <section className="bg-[#020617] rounded-t-[60px] px-6 py-20 -mt-16">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* INPUT CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <PatientForm formData={formData} setFormData={setFormData} />
            <ImageUpload formData={formData} setFormData={setFormData} />
          </div>

          {/* ANALYZE BUTTON */}
          <button
            onClick={handleAnalyze}
            className="w-full py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 transition"
          >
            Run AI Analysis
          </button>

          {/* RESULTS */}
          <div className="space-y-4">
            <HeatmapViewer
              xray={result?.xray_url}
              heatmap={result?.heatmap_url}
            />
            <ResultPanel result={result} />
            <Disclaimer />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}


