export default function GoogleRegisterButton() {
  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <button
      type="button"
      onClick={handleGoogleRegister}
      className="w-full mb-6 py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200"
    >
      Registrarse con Google
    </button>
  );
}
