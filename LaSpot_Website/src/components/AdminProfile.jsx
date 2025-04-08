import React, { useState, useEffect } from "react";
import penIcon from "../assets/pen.png";
import "../css/AdminProfile.css";

export function AdminProfile() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "name@gmail.com",
    adminCode: "2023XXXXX",
    password: "XXXX",
    image: "images/adminProfile.jpg",
    accountType: "Admin",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [editingField, setEditingField] = useState(null);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEditClick = (section) => {
    setTempProfile(profile);
    setEditingField(section);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("profile", JSON.stringify(tempProfile));
    setEditingField(null);
  };

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  return (
    <section className="adminProfile__layout">
      <div className="profile-container">
        <h2 className="profile-title">Account Settings</h2>

        <div className="profile-wrapper">
          <div className="sidebar">
            <button
              onClick={() => setActiveTab("profile")}
              className={
                activeTab === "profile"
                  ? "sidebar-button active"
                  : "sidebar-button"
              }
            >
              My Profile
            </button>
          </div>

          <div className="content-section">
            {activeTab === "profile" ? (
              <div className="profile-sections-box">
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
                      <strong>Admin Code</strong> {profile.adminCode}
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
              </div>
            ) : null}
          </div>
        </div>

        {editingField && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                Edit{" "}
                {editingField === "personal"
                  ? "Personal Information"
                  : editingField === "security"
                  ? "Account Security"
                  : null}
              </h3>
              {editingField === "personal" && (
                <>
                  <label>
                    First Name:{" "}
                    <input
                      type="text"
                      value={tempProfile.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Last Name:{" "}
                    <input
                      type="text"
                      value={tempProfile.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </label>
                  <label>
                    Email:{" "}
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </label>
                </>
              )}
              {editingField === "security" && (
                <>
                  <label>
                    Password:{" "}
                    <input
                      type="password"
                      value={tempProfile.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </label>
                </>
              )}

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
