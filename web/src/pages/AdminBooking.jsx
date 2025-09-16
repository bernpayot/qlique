import React, { useState } from "react";
import actionCheck from "../assets/actionCheck.png";
import actionNote from "../assets/actionNote.png";
import actionDelete from "../assets/actionDelete.png";

const bookings = [
  {
    queue: "000001",
    time: "2:30 PM",
    client: "Juan Dela Cruz",
    service: "Haircut & Style",
    stylist: "Sarah Kim",
    status: "In Progress",
  },
  {
    queue: "000002",
    time: "3:00 PM",
    client: "Maria Santos",
    service: "Haircut",
    stylist: "John Lee",
    status: "Waiting",
  },
  {
    queue: "000003",
    time: "3:30 PM",
    client: "Carlos Reyes",
    service: "Beard Trim",
    stylist: "Anna Cruz",
    status: "Completed",
  },
  {
    queue: "000004",
    time: "4:00 PM",
    client: "Liza Tan",
    service: "Hair Color",
    stylist: "Mark David",
    status: "Waiting",
  },
  {
    queue: "000005",
    time: "4:30 PM",
    client: "Pedro Cruz",
    service: "Haircut",
    stylist: "Sarah Kim",
    status: "In Progress",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm";
    case "Waiting":
      return "bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm";
    case "Completed":
      return "bg-green-100 text-green-700 px-2 py-1 rounded text-sm";
    default:
      return "bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm";
  }
};

export default function AdminBooking() {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (b) =>
      b.queue.toLowerCase().includes(search.toLowerCase()) ||
      b.client.toLowerCase().includes(search.toLowerCase())
  );

  const displayedBookings =
    search.trim() !== ""
      ? filteredBookings
      : showAll
      ? bookings
      : bookings.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full poppins">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Bookings"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white shadow focus:outline-none focus:ring-0"
      />

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Bookings and Queue</h2>
          <button className="bg-[linear-gradient(to_right,_#024E44,_#088776)] text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto">
            + Add Walk-In
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr
                style={{ backgroundColor: "#E2E8F0" }}
                className="text-left text-sm"
              >
                <th className="p-3">Queue #</th>
                <th className="p-3">Date/Time</th>
                <th className="p-3">Client</th>
                <th className="p-3">Service</th>
                <th className="p-3">Stylist</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedBookings.length > 0 ? (
                displayedBookings.map((b, idx) => (
                  <tr key={idx} className="border-t text-sm">
                    <td className="p-3">{b.queue}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">{b.client}</td>
                    <td className="p-3">{b.service}</td>
                    <td className="p-3">{b.stylist}</td>
                    <td className="p-3">
                      <span className={getStatusClasses(b.status)}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                        <img
                          src={actionCheck}
                          alt="check"
                          className="w-full h-full object-contain"
                        />
                      </button>
                      <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                        <img
                          src={actionNote}
                          alt="edit"
                          className="w-full h-full object-contain"
                        />
                      </button>
                      <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                        <img
                          src={actionDelete}
                          alt="delete"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="space-y-4 md:hidden">
          {displayedBookings.length > 0 ? (
            displayedBookings.map((b, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{b.client}</span>
                  <span className={getStatusClasses(b.status)}>{b.status}</span>
                </div>
                <p className="poppins text-sm text-gray-600">
                  Queue: {b.queue}
                </p>
                <p className="text-sm text-gray-600">Time: {b.time}</p>
                <p className="text-sm text-gray-600">Service: {b.service}</p>
                <p className="text-sm text-gray-600">Stylist: {b.stylist}</p>
                <div className="flex space-x-3 mt-2">
                  <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                    <img
                      src={actionCheck}
                      alt="check"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                    <img
                      src={actionNote}
                      alt="edit"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button className="hover:opacity-80 w-4 h-4 flex items-center justify-center">
                    <img
                      src={actionDelete}
                      alt="delete"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </div>

        {/* Footer */}
        {search.trim() === "" && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-green-800 hover:underline"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
