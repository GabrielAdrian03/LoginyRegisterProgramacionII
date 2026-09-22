export default function InputField({ label, type, name, value, onChange, placeholder, icon: Icon }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full bg-slate-800 text-white rounded-lg border border-slate-700 py-2.5 ${
            Icon ? 'pl-10' : 'pl-3'
          } pr-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm`}
        />
      </div>
    </div>
  );
}

