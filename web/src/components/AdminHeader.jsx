import React, { useState } from "react";
import { Settings, Bell, Menu, X } from "lucide-react";
import adminphoto from "../assets/adminphoto.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-end bg-white px-6 py-3 shadow relative">
      {/* Desktop Right: Icons + Avatar */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} className="text-pink-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <img
          src={adminphoto}
          alt="User"
          className="h-9 w-9 rounded-full object-cover"
        />
      </div>

      <button
        className="md:hidden p-2 rounded-full hover:bg-gray-100"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-64 bg-white h-full shadow-lg p-4 flex flex-col">
            {/* Close Button */}
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* Menu Items */}
            <button className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} className="mr-3 text-gray-600" />
              Settings
            </button>
            <button className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="mr-3 text-pink-500" />
              Notifications
              <span className="absolute right-4 top-3 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg mt-2">
              <img
                src="/avatar.jpg"
                alt="User"
                className="h-8 w-8 rounded-full object-cover mr-3"
              />
              <span>Profile</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
