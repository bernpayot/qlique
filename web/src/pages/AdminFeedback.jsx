import React from "react";
import StarIcon from "../assets/starIcon.png";

export default function AdminFeedbacks() {
  const feedbacks = [
    {
      date: "Today",
      client: "Maria Santos",
      stylist: "Sarah Kim",
      service: "Haircut & Style",
      rating: 5,
      comment: "Excellent service! Very happy with the result.",
    },
    {
      date: "Yesterday",
      client: "John Dela Cruz",
      stylist: "Mike Johnson",
      service: "Hair Color",
      rating: 5,
      comment: "Good color work, professional service.",
    },
    {
      date: "2 days ago",
      client: "Ana Rodriguez",
      stylist: "Lisa Wong",
      service: "Wash & Blow",
      rating: 5,
      comment: "Perfect styling! Will definitely come back.",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen poppins">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Average Rating" value="4.8" change="+0.2" />
        <StatCard title="Total Reviews" value="234" change="+15" />
        <StatCard title="Response Rate" value="68%" change="+5%" />
        <StatCard title="5-Star Reviews" value="189" change="+12" />
      </div>

      {/* Feedback Table (Desktop) */}
      <div className="bg-white shadow rounded-lg p-6 hidden md:block">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">Recent Feedback</h2>
          <button className="bg-[linear-gradient(to_right,_#024E44,_#088776)] hover:opacity-90 text-white text-sm px-4 py-1.5 rounded">
            Export Reviews
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr
                style={{ backgroundColor: "#E2E8F0" }}
                className="text-left text-sm"
              >
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Stylist</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{fb.date}</td>
                  <td className="px-4 py-3">{fb.client}</td>
                  <td className="px-4 py-3">{fb.stylist}</td>
                  <td className="px-4 py-3">{fb.service}</td>
                  <td className="px-4 py-3">
                    <div className="flex">
                      {[...Array(fb.rating)].map((_, i) => (
                        <img
                          key={i}
                          src={StarIcon}
                          alt="star"
                          className="w-4 h-4 mr-1"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{fb.comment}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs">
                      Reply
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {feedbacks.map((fb, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <div className="text-xs text-gray-500">{fb.date}</div>
            <div className="text-sm font-semibold">{fb.client}</div>
            <div className="text-xs text-gray-500 mb-1">
              Stylist: {fb.stylist}
            </div>
            <div className="text-xs text-gray-500 mb-2">Service: {fb.service}</div>
            <div className="flex mb-2">
              {[...Array(fb.rating)].map((_, i) => (
                <img
                  key={i}
                  src={StarIcon}
                  alt="star"
                  className="w-4 h-4 mr-1"
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 mb-3">{fb.comment}</p>
            <div className="flex gap-2">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs">
                Reply
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({ title, value, change }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col text-center">
      <span className="text-xs text-gray-500">{title}</span>
      <span className="text-xl font-semibold mt-1">{value}</span>
      <span className="text-green-600 text-xs mt-1">{change}</span>
    </div>
  );
}
