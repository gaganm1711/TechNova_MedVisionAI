import { useEffect, useState } from "react";

export default function ResultPanel({ result }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!result) return;

    let start = 0;
    const end = result.confidence;
    const duration = 800;
    const stepTime = 15;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setProgress(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [result]);

  if (!result) return null;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="glass-card p-5">
    <div className="bg-slate-900 text-slate-200 rounded-xl p-5 shadow-lg fade-in">
      <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
        📊 AI Interpretation
      </h2>

      <div className="flex items-center gap-6 mb-4">
        {/* Animated Ring */}
        <svg width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#1e293b"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-blue-400 text-sm font-bold"
          >
            {progress}%
          </text>
        </svg>

        <p className="text-sm text-slate-400">
          Confidence based on visual pattern agreement.
        </p>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">
        {result.explanation}
      </p>
    </div>
    </div>
  );
}
