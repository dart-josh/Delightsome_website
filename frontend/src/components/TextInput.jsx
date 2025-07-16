/* eslint-disable react/prop-types */
const TextInput = ({
  label,
  value,
  onChange,
  placeholder = "Enter text...",
  error = "",
  type = "text",
  name,
  rows,
  required,
  readOnly,
}) => {
  // Format number with commas (e.g., 1000000 → 1,000,000)
  const formatNumber = (num) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="ml-1 text-red-500">(*)</span>}
        </label>
      )}
      {(rows && rows > 1 && (
        <textarea
        readOnly={readOnly}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full resize-none rounded-2xl border px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
          }`}
        />
      )) ||
        (type === "num" && (
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              ₦
            </span>
            <input
            readOnly={readOnly}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value ? formatNumber(value) : ""}
              onChange={onChange}
              placeholder={placeholder}
              className={`w-full pl-8 rounded-2xl border px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
              }`}
            />
          </div>
        )) || (
          <input
          readOnly={readOnly}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full rounded-2xl border px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
        )}

      {/* error */}
      {error && (
        <p className="mt-1 text-sm text-red-500 transition-opacity duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
