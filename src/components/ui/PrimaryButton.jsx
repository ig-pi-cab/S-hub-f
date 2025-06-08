export default function PrimaryButton({ to, children }) {
  return (
    <a
      href={to}
      className="bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition text-center block"
    >
      {children}
    </a>
  );
}
