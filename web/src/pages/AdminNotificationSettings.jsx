import React, { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    sms: true,
    push: true,
    email: false,
    googleCalendar: true,
    newAppointment: true,
    queueUpdates: true,
    noShow: false,
    autoCancelHours: 4,
    reminderMinutes: 30,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    alert("Settings saved!");
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen poppins text-base">
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-5">Notification Settings</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Client Notifications */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Client Notifications</h3>
            <div className="space-y-3">
              {[
                { key: "sms", label: "SMS Notifications (3 people away)" },
                { key: "push", label: "Push Notifications" },
                { key: "email", label: "Email Confirmations" },
                { key: "googleCalendar", label: "Google Calendar Integration" },
              ].map((item) => (
                <div key={item.key} className="p-3 shadow rounded bg-white">
                  <ToggleRow
                    label={item.label}
                    enabled={settings[item.key]}
                    onClick={() => handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Staff Notifications */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Staff Notifications</h3>
            <div className="space-y-3">
              {[
                { key: "newAppointment", label: "New Appointment Alerts" },
                { key: "queueUpdates", label: "Queue Updates" },
                { key: "noShow", label: "Client No-Show Alerts" },
              ].map((item) => (
                <div key={item.key} className="p-3 shadow rounded bg-white">
                  <ToggleRow
                    label={item.label}
                    enabled={settings[item.key]}
                    onClick={() => handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="mt-5 space-y-4">
          <div className="p-3 shadow rounded bg-white">
            <label className="block text-sm mb-1">
              Auto-Cancel Unconfirmed Bookings (hours)
            </label>
            <input
              type="number"
              name="autoCancelHours"
              value={settings.autoCancelHours}
              onChange={handleChange}
              className="w-20 px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="p-3 shadow rounded bg-white">
            <label className="block text-sm mb-1">
              Reminder Time Before Appointment (minutes)
            </label>
            <input
              type="number"
              name="reminderMinutes"
              value={settings.reminderMinutes}
              onChange={handleChange}
              className="w-20 px-2 py-1 border rounded text-sm"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-5">
          <button
            onClick={handleSave}
            className="bg-[linear-gradient(to_right,_#024E44,_#088776)] text-white px-6 py-2 rounded-lg hover:opacity-90 text-base"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Toggle Component
function ToggleRow({ label, enabled, onClick }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span>{label}</span>
      <button
        onClick={onClick}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
          enabled
            ? "bg-[linear-gradient(to_right,_#024E44,_#088776)]"
            : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
