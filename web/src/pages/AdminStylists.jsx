import { useState } from "react";
import actionCheck from "../assets/actionCheck.png";
import actionNote from "../assets/actionNote.png";
import actionDelete from "../assets/actionDelete.png";
import starIcon from "../assets/starIcon.png"; 

// Sample data
const stylists = [
  { id: "000001", specialties: "Haircut, Color, Styling", status: "Available", appointments: 6, rating: 5 },
  { id: "000002", specialties: "Haircut, Color, Styling", status: "Busy", appointments: 4, rating: 4 },
  { id: "000003", specialties: "Haircut, Color, Styling", status: "Available", appointments: 8, rating: 5 },
  { id: "000004", specialties: "Haircut, Color, Styling", status: "Available", appointments: 3, rating: 3 },
  { id: "000005", specialties: "Haircut, Styling", status: "Busy", appointments: 5, rating: 4 },
  { id: "000006", specialties: "Haircut, Coloring", status: "Available", appointments: 7, rating: 5 },
  { id: "000007", specialties: "Styling", status: "Available", appointments: 2, rating: 3 },
  { id: "000008", specialties: "Haircut, Color", status: "Busy", appointments: 9, rating: 4 },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Available":
      return "bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm";
    case "Busy":
      return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm";
    default:
      return "bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm";
  }
};

export default function AdminStylists() {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filteredStylists = stylists.filter((s) =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.specialties.toLowerCase().includes(search.toLowerCase())
  );

  const visibleStylists =
    search.trim() !== "" ? filteredStylists : showAll ? filteredStylists : filteredStylists.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full poppins">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by ID or Speciality"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white shadow focus:outline-none text-sm sm:text-base"
      />

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-4 mt-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">Stylists</h2>
          <button className="bg-[linear-gradient(to_right,_#024E44,_#088776)] text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base w-full sm:w-auto">
            + Add Device
          </button>
        </div>

        {/* Table - Desktop */}
        <table className="hidden sm:table w-full border-separate border-spacing-y-3 text-xs sm:text-sm">
          <thead>
            <tr style={{ backgroundColor: "#E2E8F0" }} className="text-left text-sm">
              <th className="p-2 sm:p-3">Name</th>
              <th className="p-2 sm:p-3">Specialities</th>
              <th className="p-2 sm:p-3">Status</th>
              <th className="p-2 sm:p-3">Appointments</th>
              <th className="p-2 sm:p-3">Rating</th>
              <th className="p-2 sm:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleStylists.length > 0 ? (
              visibleStylists.map((s) => (
                <tr key={s.id} className="bg-white text-xs sm:text-sm">
                  <td className="px-2 py-1">{s.id}</td>
                  <td className="px-2 py-1">{s.specialties}</td>
                  <td className="px-2 py-1">
                    <span className={`${getStatusClasses(s.status)} text-[11px] sm:text-xs`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-2 py-1">{s.appointments} Appointments</td>
                  <td className="px-2 py-1">
                    <div className="flex justify-center items-center space-x-1">
                      {Array.from({ length: s.rating }).map((_, i) => (
                        <img
                          key={i}
                          src={starIcon}
                          alt="star"
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button className="hover:opacity-80">
                        <img src={actionCheck} alt="check" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button className="hover:opacity-80">
                        <img src={actionNote} alt="note" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <button className="hover:opacity-80">
                        <img src={actionDelete} alt="delete" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-4 text-xs sm:text-sm">
          {visibleStylists.length > 0 ? (
            visibleStylists.map((s) => (
              <div
                key={s.id}
                className="rounded-lg p-3 sm:p-4 text-xs sm:text-sm border border-black bg-gray-50"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Name:</span>
                  <span>{s.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Specialities:</span>
                  <span>{s.specialties}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Status:</span>
                  <span className={getStatusClasses(s.status)}>{s.status}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Appointments:</span>
                  <span>{s.appointments}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Rating:</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: s.rating }).map((_, i) => (
                      <img key={i} src={starIcon} alt="star" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">Actions:</span>
                  <div className="flex space-x-2">
                    <button className="hover:opacity-80">
                      <img src={actionCheck} alt="check" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button className="hover:opacity-80">
                      <img src={actionNote} alt="note" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button className="hover:opacity-80">
                      <img src={actionDelete} alt="delete" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
        </div>

        {/* Footer */}
        {search.trim() === "" && filteredStylists.length > 4 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-green-800 hover:underline"
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
