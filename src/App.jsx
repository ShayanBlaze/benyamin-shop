import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardHome from "./pages/Dashboard/DashboardHome";
// import { Orders, Favorites, Address, Account } from "./pages/Dashboard/DashboardPlaceholders";
import DashboardOrders from "./pages/Dashboard/DashboardOrders";
import DashboardFavorites from "./pages/Dashboard/DashboardFavorites";
import DashboardAddresses from "./pages/Dashboard/DashboardAddresses";
import DashboardAccount from "./pages/Dashboard/DashboardAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />

        {/* Main Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="favorites" element={<DashboardFavorites />} />
          <Route path="address" element={<DashboardAddresses />} />
          <Route path="account" element={<DashboardAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
