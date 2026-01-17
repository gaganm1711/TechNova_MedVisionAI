import { useState } from "react";

export default function HeatmapViewer({ xray, heatmap }) {
  const [showHeatmap, setShowHeatmap] = useState(true);

  if (!xray || !heatmap) return null;

  return (
    <div className="bg-slate-900 text-slate-200 rounded-xl p-4 shadow-lg fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          🔥 Grad-CAM Explainability
        </h2>

        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="text-xs text-blue-400 hover:underline"
        >
          {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
        </button>
      </div>

      <div className="relative max-w-md mx-auto">
        <img
          src={xray}
          className="rounded-lg border border-slate-700"
        />

        {showHeatmap && (
          <img
            src={heatmap}
            className="absolute inset-0 opacity-40 rounded-lg transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}



