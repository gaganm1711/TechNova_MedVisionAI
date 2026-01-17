export default function ImageUpload({ formData, setFormData }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h2 className="text-md font-semibold mb-3 text-slate-200">
        X-Ray Input
      </h2>

      {/* Custom Upload Button */}
      <label className="flex flex-col items-center justify-center w-full h-32 
        border-2 border-dashed border-slate-600 rounded-lg cursor-pointer 
        bg-slate-900 hover:border-blue-500 hover:bg-slate-800 transition">

        <svg
          className="w-8 h-8 text-blue-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V12M12 16V8M17 16V12M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p className="text-sm text-slate-300">
          {formData.image
            ? formData.image.name
            : "Click to upload X-ray image"}
        </p>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </label>

      {/* Body Part Selector */}
      <select
        className="mt-3 w-full p-2 rounded bg-slate-900 border border-slate-700 
        text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) =>
          setFormData({ ...formData, bodyPart: e.target.value })
        }
      >
        <option value="">Select Body Part</option>
        <option value="chest">Chest</option>
        <option value="shoulder">Shoulder</option>
        <option value="Elbow">Elbow</option>
        <option value="Wrist">Wrist</option>
        <option value="limb">Limb</option>
        <option value="spine">Spine</option>
      </select>
    </div>
  );
}
