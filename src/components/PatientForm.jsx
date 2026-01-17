export default function PatientForm({ formData, setFormData }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h2 className="text-md font-semibold mb-3 text-slate-200">
        Patient Information
      </h2>

      <input
        type="text"
        placeholder="Patient Name"
        className="w-full mb-2 p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Age"
        className="w-full mb-2 p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) =>
          setFormData({ ...formData, age: e.target.value })
        }
      />

      <textarea
        placeholder="Symptoms / Clinical Notes"
        rows="3"
        className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) =>
          setFormData({ ...formData, symptoms: e.target.value })
        }
      />
    </div>
  );
}
