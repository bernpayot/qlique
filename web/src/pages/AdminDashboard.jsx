import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Here you can see an overview of your platform metrics, bookings, and activities.
      </p>

      {/* Example cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg">Total Bookings</h2>
          <p className="text-2xl text-green-700 mt-2">120</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg">Active Stylists</h2>
          <p className="text-2xl text-blue-700 mt-2">8</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-lg">Pending Feedbacks</h2>
          <p className="text-2xl text-yellow-700 mt-2">5</p>
        </div>
      </div>
    </div>
  );
}
