import { Link } from "react-router-dom";

export default function SidebarLink({ to, icon, label, expanded, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors 
        ${active ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'hover:bg-gray-100'}`}
    >
      <span>{icon}</span>
      {expanded && <span>{label}</span>}
    </Link>
  );
}
