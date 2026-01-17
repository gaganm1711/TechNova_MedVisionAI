export default function ResultPanel({ result }) {
  if (!result) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h2 className="text-md font-semibold mb-2 text-slate-200">
        AI Interpretation
      </h2>

      <p className="text-sm text-slate-400 mb-2">
        Confidence: <span className="text-green-400 font-semibold">
          {result.confidence}%
        </span>
      </p>

      <p className="text-sm text-slate-300 leading-relaxed">
        {result.explanation}
      </p>
    </div>
  );
}
