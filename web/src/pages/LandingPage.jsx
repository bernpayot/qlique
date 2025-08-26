import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import Logo from "../assets/qliqueLogo.png";
import WhiteLogo from "../assets/whiteLogo.png";
import Logo1 from "../assets/material-symbols_book.png";
import Logo2 from "../assets/mingcute_notification-fill.png";
import Logo3 from "../assets/material-symbols_style.png";
import Logo4 from "../assets/ic_baseline-queue (1).png";
import Logo5 from "../assets/material-symbols_reviews.png";
import Logo6 from "../assets/mingcute_calendar-fill.png";
import phone from "../assets/Rectangle 7104.png";
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4 shadow-sm relative bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Qlique Logo" className="h-10 w-auto" />
          <span style={{ fontFamily: 'Gilroy, sans-serif', color: '#024E44' }}
          className="text-2xl font-bold">Qlique</span>
        </div>

        {/* Burger Button*/}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="hidden justify-center md:flex space-x-10 text-gray-700">
          <a href="#features" className="poppins font-semibold text-black hover:text-teal-600">Features</a>
          <a href="#" className="poppins font-semibold text-black hover:text-teal-600">How It Works</a>
          <a href="#" className="poppins font-semibold text-black hover:text-teal-600">Pricing</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <span className="poppins font-medium px-4 py-2 text-gray-700">
                Welcome, {user?.name || 'User'}!
              </span>
              <button
                className="poppins font-medium px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="poppins font-medium px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => navigate("/signin")}
              >
                Log in
              </button>
              <button 
                className="poppins font-semibold px-4 py-2 bg-[#024E44] text-white rounded-lg hover:bg-[#023C34]"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            </>
          )}
        </div>

    {/* Mobile Dropdown */}
    {menuOpen && (
    <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 space-y-4 z-50">
        <a href="#features" className="poppins font-semibold text-black hover:text-teal-600">Features</a>
        <a href="#" className="poppins font-semibold text-black hover:text-teal-600">How It Works</a>
        <a href="#" className="poppins font-semibold text-black hover:text-teal-600">Pricing</a>

        <button
        className="font-poppins font-semibold x-4 py-2 border rounded-lg hover:bg-gray-100 w-40"
        onClick={() => navigate("/signin")}>Log in</button>
        <button
        className="font-poppins font-semibold px-4 py-2 bg-[#024E44] text-white rounded-lg hover:bg-[#023C34] w-40"
        onClick={() => navigate("/signup")}>Get Started
        </button>
  </div>
        )}
      </header>

      {/* Hero Section */}
    <section className="relative bg-[linear-gradient(to_right,_#024E44,_#088776)] text-white py-20 px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div className="flex flex-col justify-center">
        <h2 className="gilroy text-4xl md:text-5xl font-extrabold mb-6">
            Skip the Wait,<br /> Love Your Look
        </h2>
        <p className="poppins max-w-lg text-lg mb-8 text-[#AFFFF5]">
            Smart salon booking and queue management that puts you in control. 
            Book appointments, join queues, and get personalized haircut recommendations—all from your phone.
        </p>

            <div className="flex gap-4">
              <button className="bg-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-600 transition">
                Book Now
              </button>
              <button className="border border-white px-5 py-2 rounded-full text-white hover:bg-white hover:text-teal-800 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <img 
          src={phone}
          alt="Salon Booking App" 
          className="absolute bottom-[-20px] right-4 md:right-20 w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 rounded-2xl shadow-lg z-0 hidden sm:block"
        />
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-16 bg-gray-50">
        <h2 className="poppins text-black text-3xl font-bold text-center mb-5">Everything You Need</h2>
        <p className="poppins font-semibold text-center text-black max-w-2xl mx-auto mb-12">
          Powerful features designed to transform your salon experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={Logo1} title="Multi-Platform Booking" description="Book from anywhere using our mobile app, website, or in-salon kiosk. Real-time availability prevents double bookings." bgColor="bg-[#024E44]" />
          <FeatureCard icon={Logo2} title="Smart Notifications" description="Get SMS and push alerts when you're almost next. Dynamic updates adjust wait times if delays occur." bgColor="bg-[#F27B9B]" />
          <FeatureCard icon={Logo3} title="Style Recommendations" description="Take our quick quiz to get personalized haircut suggestions based on your lifestyle and preferences." bgColor="bg-[#024E44]" />
          <FeatureCard icon={Logo4} title="Queue Management" description="See your position in real-time, estimated wait times, and manage your bookings effortlessly." bgColor="bg-[#024E44]" />
          <FeatureCard icon={Logo5} title="Reviews & Ratings" description="Share feedback and see ratings from other clients to choose the perfect stylist for you." bgColor="bg-[#F27B9B]" />
          <FeatureCard icon={Logo6} title="Calendar Integration" description="Automatic calendar sync with reminders ensures you never miss your appointment." bgColor="bg-[#024E44]" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-400 text-white text-center py-16 px-6">
        <h3 className="gilroy text-4xl font-bold mb-4">Ready to Transform Your Salon Experience?</h3>
        <p className="mb-8 text-lg max-w-2xl mx-auto" style={{ color: "#CFE2FF" }}>
          Join thousands of satisfied clients who've discovered the smarter way to book and manage salon appointments.
        </p>
        <div className="space-x-4">
          <button className="poppins px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-green-200">Download App</button>
          <button className="px-6 py-3 border border-white rounded-full font-medium hover:bg-white hover:text-pink-600">Learn More</button>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-black text-gray-300 py-12 px-8">
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
    <div>
      <div className="flex items-center gap-2 mb-3">
        <img src={WhiteLogo} alt="Qlique Logo" className="w-8 h-8" />
        <h4 className="text-xl font-bold text-white">Qlique</h4>
      </div>
      <p>Making salon visits smarter, faster, and more personalized.</p>
    </div>
    
    <div>
      <h5 className="font-semibold text-white mb-3">Product</h5>
      <ul className="space-y-2">
        <li><a href="#">Mobile App</a></li>
        <li><a href="#">Features</a></li>
      </ul>
    </div>
    
    <div>
      <h5 className="font-semibold text-white mb-3">Company</h5>
      <ul className="space-y-2">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Press</a></li>
        <li><a href="#">Contacts</a></li>
      </ul>
    </div>
    
    <div>
      <h5 className="font-semibold text-white mb-3">Support</h5>
      <ul className="space-y-2">
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
  </div>
  
  <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
    © 2025 Qlique. All rights reserved.
  </div>
</footer>

    </div>
  );
}
