export default function SubmitButton({ loading, text, loadingText }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 rounded bg-primary text-white hover:bg-indigo-700 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? loadingText : text}
    </button>
  );
}
