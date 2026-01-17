export default function PatientForm({ formData, setFormData }) {
  return (
    <div className="glass-card p-5">
    <div className="bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-800">
      <h2 className="text-sm font-semibold text-blue-400 mb-3">
        🧑‍⚕️ Patient Information
      </h2>

      <input
        placeholder="Patient Name"
        className="w-full mb-3 p-2 rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Age"
        className="w-full mb-3 p-2 rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />

      <textarea
        placeholder="Symptoms / Clinical Notes"
        rows="3"
        className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500"
        onChange={(e) =>
          setFormData({ ...formData, symptoms: e.target.value })
        }
      />
    </div>
    </div>
  );
}


