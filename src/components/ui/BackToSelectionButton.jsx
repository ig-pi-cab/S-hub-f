import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToSelectionButton() {
  return (
    <Link
      to="/"
      className="mb-4 inline-flex items-center text-sm text-primary hover:underline"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Volver
    </Link>
  );
}
