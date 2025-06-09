export default function InputField({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete, // ✅ nuevo
  minLength,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete} // ✅ aplicado
    minLength={minLength} // ✅ nativo de HTML5
      className="w-full p-2 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
