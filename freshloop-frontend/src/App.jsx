import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* Public */
import LandingPage from "./pages/LandingPage";
import EntrySelect from "./pages/EntrySelect";

/* Customer */
import RegisterStudent from "./pages/RegisterStudent";
import RegisterEmployee from "./pages/RegisterEmployee";
import CustomerLogin from "./pages/CustomerLogin";
import OtpVerify from "./pages/OtpVerify";
import AddressPage from "./pages/AddressPage";
import PublicDeals from "./pages/PublicDeals";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import TrackingPage from "./pages/TrackingPage";
import MyOrders from "./pages/MyOrders";
import RoleSelect from "./pages/RoleSelect";
import CustomerProfile from "./pages/CustomerProfile";
import ChatPopup from "./components/ChatPopup";




/* Restaurant */
import RestaurantRegister from "./pages/RestaurantRegister";
import RestaurantLogin from "./pages/RestaurantLogin";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import CustomerType from "./pages/CustomerType";






export default function App() {
    const user = JSON.parse(localStorage.getItem("user"));
    
if (user) {
  console.log("Welcome", user.name);
}
  return (
    <BrowserRouter>
      <Navbar />
      <ChatPopup />
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />
        

        {/* Customer */}
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/restaurants" element={<PublicDeals />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/entry" element={<RoleSelect />} />
        <Route path="/customer/type" element={<CustomerType />} />
        <Route path="/login/student" element={<CustomerLogin />} />
        <Route path="/login/employee" element={<CustomerLogin />} />
        <Route path="/profile" element={<CustomerProfile />} />

    {/* Restaurant */}
        <Route path="/restaurant/register" element={<RestaurantRegister />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />

      </Routes>
      

    </BrowserRouter>
  );
}
