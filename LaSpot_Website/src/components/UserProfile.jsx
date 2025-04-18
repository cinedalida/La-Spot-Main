// Import necessary modules and assets
import React, { useState, useEffect } from "react";
import penIcon from "../assets/pen.png";
import "../css/UserProfile.css";
import { LogoutButton } from "./Logoutbutton";

// Main functional component
export function UserProfile() {
  // State for user profile data
  const [profile, setProfile] = useState({
    firstName: "Marti Kier",
    lastName: "Trance",
    email: "name@gmail.com",
    studentNumber: "2023XXXXX",
    password: "XXXX",
    vehicleType: "Sedan",
    plateNumber: "MKT1234",
    image: "./images/userProfile.jpg",
    accountType: "Student",
  });

  // State for storing parking history
  const [parkingHistory, setParkingHistory] = useState([]);

  // State to track which tab is currently active (profile or history)
  const [activeTab, setActiveTab] = useState("profile");

  // State to track which section is being edited
  const [editingField, setEditingField] = useState(null);

  // Temporary profile data used while editing
  const [tempProfile, setTempProfile] = useState(profile);

  // Load saved profile and initialize history when component mounts
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);

    // Hardcoded sample history
    setParkingHistory([
      {
        date: "March 25, 2025",
        timeIn: "08:00 AM",
        timeOut: "12:00 PM",
        location: "Parking Lot A",
      },
      {
        date: "March 24, 2025",
        timeIn: "09:15 AM",
        timeOut: "01:45 PM",
        location: "Parking Lot B",
      },
    ]);
  }, []);

  // Function to start editing a section
  const handleEditClick = (section) => {
    setTempProfile(profile); // copy current profile to temp
    setEditingField(section); // set which field is being edited
  };

  // Function to save changes
  const handleSave = () => {
    setProfile(tempProfile); // apply edited values to real profile
    localStorage.setItem("profile", JSON.stringify(tempProfile)); // save to local storage
    setEditingField(null); // close modal
  };

  // Update temporary profile while editing
  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  return (
    <section className="userProfile__layout">
      <div className="profile-container">
        <h2 className="userAccount__title">Account Settings</h2>

        <div className="profile-wrapper">
          {/* Sidebar for switching tabs */}
          <div className="sidebar">
            <button
              onClick={() => setActiveTab("profile")}
              className={
                activeTab === "profile"
                  ? "sidebar-button active"
                  : "sidebar-button"
              }
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={
                activeTab === "history"
                  ? "sidebar-button active"
                  : "sidebar-button"
              }
            >
              History
            </button>
          </div>

          {/* Main content */}
          <div className="content-section">
            {activeTab === "profile" ? (
              <div className="profile-sections-box">
                {/* Display profile info */}
                <h2 className="My-profile-title">My Profile</h2>
                <div className="profile-header">
                  <div className="profile-image-container">
                    <img src={profile.image} alt="Profile" />
                  </div>
                  <div className="profile-info-container">
                    <h2 className="accountFullname">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="accountDisplaytype">{profile.accountType}</p>
                    <p className="accountDisplayemail">{profile.email}</p>
                  </div>
                </div>

                {/* Personal Information section */}
                <div className="personal-infoBox">
                  <h3 className="section-title">Personal Information </h3>
                  <div className="info-content">
                    <p>
                      <strong>First Name:</strong> {profile.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {profile.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                      <strong>Student Number:</strong> {profile.studentNumber}
                    </p>
                  </div>
                  <div className="edit-button-container">
                    <button
                      onClick={() => handleEditClick("personal")}
                      className="edit-button"
                    >
                      Edit <img src={penIcon} alt="Edit" className="pen-icon" />
                    </button>
                  </div>
                </div>

                {/* Account Security section */}
                <div className="account-securityBox">
                  <h3 className="content-title">Account Security</h3>
                  <div className="security-content">
                    <p>
                      <strong>Password:</strong> {profile.password}
                    </p>
                  </div>
                  <div className="edit-button-container">
                    <button
                      onClick={() => handleEditClick("security")}
                      className="edit-button"
                    >
                      Edit <img src={penIcon} alt="Edit" className="pen-icon" />
                    </button>
                  </div>
                </div>

                {/* Vehicle Info section */}
                <div className="vehicle-infoBox">
                  <h3 className="content-title">Vehicle Information</h3>
                  <div className="vehicle-content">
                    <p>
                      <strong>Type of Vehicle:</strong> {profile.vehicleType}
                    </p>
                    <p>
                      <strong>Plate Number:</strong> {profile.plateNumber}
                    </p>
                  </div>
                  <div className="edit-button-container">
                    <button
                      onClick={() => handleEditClick("vehicle")}
                      className="edit-button"
                    >
                      Edit <img src={penIcon} alt="Edit" className="pen-icon" />
                    </button>
                  </div>
                </div>
                {/* Logout Button */}
                <LogoutButton />
              </div>
            ) : (
              // History tab content
              <div>
                <div className="parking-history-box">
                  <h2 className="content-title-table">History</h2>
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Loop through history array and render each record */}
                      {parkingHistory.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.date}</td>
                          <td>{entry.timeIn}</td>
                          <td>{entry.timeOut}</td>
                          <td>{entry.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal Popup */}
        {editingField && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                Edit{" "}
                {editingField === "personal"
                  ? "Personal Information"
                  : editingField === "security"
                  ? "Account Security"
                  : "Vehicle Information"}
              </h3>

              {/* Edit Personal Information */}
              {editingField === "personal" && (
                <>
                  <label>
                    First Name:
                    <input
                      type="text"
                      value={tempProfile.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      value={tempProfile.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </label>
                  <label>
                    Student Number:
                    <input
                      type="text"
                      value={tempProfile.studentNumber}
                      onChange={(e) =>
                        handleChange("studentNumber", e.target.value)
                      }
                    />
                  </label>
                </>
              )}

              {/* Edit Security Info */}
              {editingField === "security" && (
                <>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={tempProfile.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </label>
                </>
              )}

              {/* Edit Vehicle Info */}
              {editingField === "vehicle" && (
                <>
                  <label>
                    Type of Vehicle:
                    <input
                      type="text"
                      value={tempProfile.vehicleType}
                      onChange={(e) =>
                        handleChange("vehicleType", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Plate Number:
                    <input
                      type="text"
                      value={tempProfile.plateNumber}
                      onChange={(e) =>
                        handleChange("plateNumber", e.target.value)
                      }
                    />
                  </label>
                </>
              )}

              {/* Buttons to save or cancel editing */}
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
