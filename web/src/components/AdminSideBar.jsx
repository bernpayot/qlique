import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/dashboard.png";
import UserIcon from "../assets/user.png";
import StylistIcon from "../assets/adminStylist.png";
import Logo from "../assets/qliqueLogo.png";
import ClientIcon from "../assets/clientIcon.png";
import Adminnotif from "../assets/adminnotifIcon.png";
import FeedbackIcon from "../assets/adminfeedbackIcon.png";
import AnalyticsIcon from "../assets/adminanalyticsIcon.png";

const menuItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/admin/dashboard" },
  { name: "Bookings & Queue", icon: UserIcon, path: "/admin/bookings" },
  { name: "Stylist", icon: StylistIcon, path: "/admin/stylists" },
  { name: "Client", icon: ClientIcon, path: "/admin/clients" },
  { name: "Analytics & Report", icon: Adminnotif, path: "/admin/analytics" },
  { name: "Notification", icon: FeedbackIcon, path: "/admin/notifications" },
  { name: "Feedbacks", icon: AnalyticsIcon, path: "/admin/feedbacks" },
];

export default function Sidebar() {
  return (
    <div
      className="
        bg-white shadow-md flex flex-col py-6
        w-16 md:w-52 min-h-screen transition-all duration-300
      "
    >
      {/* Logo */}
      <div className="px-3 md:px-6 mb-10 flex items-center justify-center md:justify-start gap-2">
        <img src={Logo} alt="Qlique Logo" className="h-8 md:h-10 w-auto" />
        <h1
          className="hidden md:block text-2xl font-bold"
          style={{ fontFamily: 'Gilroy, sans-serif', color: '#024E44' }}
        >
          Qlique
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 poppins text-sm">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center md:justify-start justify-center 
               gap-3 px-3 md:px-5 py-3 rounded-lg transition-colors relative group
              ${
                isActive
                  ? 'bg-green-100 text-green-800 font-semibold'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-green-700'
              }`
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-5 h-5 object-contain flex-shrink-0"
            />
            <span className="hidden md:inline">{item.name}</span>

            {/* Tooltip for mobile */}
            <span
              className="
                absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100
                transition-opacity pointer-events-none md:hidden
              "
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
