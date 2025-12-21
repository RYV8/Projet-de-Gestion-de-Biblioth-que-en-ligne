import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accueil } from "./components/Accueil/Accueil";
import { DashboardUser } from "./components/DashboardUser/dashboarduser";
import { ListLivresCategorie } from "./components/viewLivres&Categorie/listLivres&Categories";
import { DashboardBilbiothecaire } from "./components/DashbordBiblio/dashboardbiblio";
import { DashboardAdmin } from "./components/DashboardAdmin/dashboardadmin";
import { Register } from "./components/auth/register";
import { Login } from "./components/auth/login";
import { Logout } from "./components/auth/logout";
import { NotFound } from "./components/auth/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/catalogue" element={<ListLivresCategorie />} />
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route
          path="/dashboard/bibliothecaire"
          element={<DashboardBilbiothecaire />}
        />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
