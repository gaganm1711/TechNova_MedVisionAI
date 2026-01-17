export default function HeatmapViewer({ xray, heatmap }) {
  if (!xray || !heatmap) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h2 className="text-md font-semibold mb-3 text-slate-200">
        Grad-CAM Explainability
      </h2>

      <div className="relative max-w-md mx-auto">
        <img src={xray} className="rounded-lg" />
        <img
          src={heatmap}
          className="absolute inset-0 opacity-40 rounded-lg"
        />
      </div>
    </div>
  );
}

