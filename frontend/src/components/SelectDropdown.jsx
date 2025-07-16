/* eslint-disable react/prop-types */
import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    padding: "4px",
    borderRadius: "1rem",
    borderColor: state.isFocused ? "#a855f7" : "#d1d5db", // purple-500 or gray-300
    boxShadow: state.isFocused ? "0 0 0 2px rgba(168, 85, 247, 0.3)" : "none",
    "&:hover": {
      borderColor: "#a855f7",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#ede9fe", // light purple-100
    borderRadius: "8px",
    padding: "2px 6px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#7c3aed", // purple-600
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#7c3aed",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ddd6fe",
      color: "#4c1d95",
    },
  }),
};

const SelectDropdown = ({ label, options, value, isMulti, onChange, error, required, readOnly }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500 ml-1">(*)</span>}
        </label>
      )}
      <Select
        isDisabled={readOnly}
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={onChange}
        styles={customStyles}
        className="text-sm"
        placeholder="Select options..."
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectDropdown;
