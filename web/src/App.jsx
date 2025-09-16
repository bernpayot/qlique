import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupForm from "./pages/SignupForm";
import SignInForm from "./pages/SignInForm";
import AdminBooking from "./pages/AdminBooking";
import AdminLayout from "./pages/AdminLayout";
import AdminStylists from "./pages/AdminStylists";
import AdminNotificationSettings from "./pages/AdminNotificationSettings";
import AdminFeedback from "./pages/AdminFeedback";


export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/signin" element={<SignInForm />} />

      {/* Admin (with Sidebar + Header) */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
      <Route path="bookings" element={<AdminBooking />} />
      <Route path="clients" element={<h1>Clients Page</h1>} />
      <Route path="stylists" element={<AdminStylists />} />
      <Route path="analytics" element={<h1>Admin Analytics</h1>} />
      <Route path="notifications" element={<AdminNotificationSettings />}  />
      <Route path="feedbacks" element={<AdminFeedback />} />
      </Route>
    </Routes>
  );
}
