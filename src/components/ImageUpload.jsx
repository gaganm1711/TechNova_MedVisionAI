export default function ImageUpload({ formData, setFormData }) {
  return (
    <div className="glass-card p-5">
    <div className="bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-800">
      <h2 className="text-sm font-semibold text-blue-400 mb-3">
        🩻 X-ray Upload
      </h2>

      <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800 hover:border-blue-500 transition">
        <p className="text-slate-400 text-sm">
          {formData.image
            ? formData.image.name
            : "Click to upload X-ray image"}
        </p>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </label>

      <select
        className="mt-4 w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500"
        onChange={(e) =>
          setFormData({ ...formData, bodyPart: e.target.value })
        }
      >
        <option value="">Select Body Part</option>
        <option value="chest">Chest</option>
        <option value="limb">Limb</option>
        <option value="spine">Spine</option>
      </select>
    </div>
    </div>
  );
}


