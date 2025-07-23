import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "./page/signUp/SignUp";
import Login from "./page/login/LogIn";
import VehicleForm from "./page/addvehical/AddVehical";
import Layout from "./layout/Layout";
import Cookies from "js-cookie";
import api from "./hook/apiServices";
import { useState } from "react";
import { useEffect } from "react";
import Home from "./page/home/Home";
import VehicleBookingpage from "./page/avialableVehical/AvailableVehical";
import BookingTable from "./page/avialableVehical/Bookingdetails";

// ProtectedRoute component
function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/referesh");
        console.log(!!res?.data?.token);
        setIsAuth(!!res?.data?.token);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/addVehical" element={<VehicleForm />} />
            <Route path="/availableVehical" element={<VehicleBookingpage />} />
            <Route path="/booking-details" element={<BookingTable />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
