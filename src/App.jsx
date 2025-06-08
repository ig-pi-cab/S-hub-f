import { Routes, Route } from "react-router-dom";
import AuthSelectionPage from "./pages/AuthSelectionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateServicePage from "./pages/CreateServicePage";
import ServiceListPage from "./pages/ServiceListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthSelectionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/services/create" element={<CreateServicePage />} />
      </Route>
    </Routes>
  );
}

export default App;
