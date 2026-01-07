import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { routes } from "@/routes/routes";

import { Login } from "@/pages/Login/Login";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { Clients } from "@/pages/Clients/Clients";

function App() {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />

      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path={routes.clients} element={<Clients />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={routes.dashboard} replace />} />
    </Routes>
  );
}

export default App;
