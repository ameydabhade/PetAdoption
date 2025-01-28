import React, { useState, useEffect } from "react";
import { NOTIFICATIONS_URL } from "../utils/URLs";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch(NOTIFICATIONS_URL); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
      >
        🛎️
      </button>

      {/* Notification Popup */}
      {showPopup && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-10">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-lg">Notifications</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ✖️
            </button>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 border-b border-gray-200 last:border-0 hover:bg-gray-100"
                >
                  <p className="text-sm text-gray-500">
                    New pet available for adoption!
                  </p>
                  <p className="font-medium">{notification.name}</p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default NotificationsPage;
