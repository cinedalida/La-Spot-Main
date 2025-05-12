import React, { useState, useEffect } from "react";
import penIcon from "../assets/pen.png";
import { useAuth } from "../customHooks/AuthContext";
import { useGetFetch } from "../customHooks/useGetFetch";
import { usePutFetch } from "../customHooks/usePutFetch"
import "../css/AdminProfile.css";
import { LogoutButton } from "./Logoutbutton";

export function AdminProfile() {
  const { data: profileData, isPending, error, triggerGet } = useGetFetch();
  const { data: updatedProfileData, isPending: updatingProfile, error: updateError, triggerPut} = usePutFetch();
  const {auth, setAuth, loading} = useAuth();
  // console.log("Auth object:", auth);

  // const [profileData, setProfileData] = useState({
  //   first_name: "John",
  //   last_name: "Doe",
  //   email: "name@gmail.com",
  //   admin_code: "2023XXXXX",
  //   password: "XXXX",
  //   image: "images/adminProfile.jpg",
  //   accountType: "Admin",
  // });

  useEffect(() => {
    triggerGet(`http://localhost:8080/admin-profile/${auth.ID}`)
  }, [])

  const [activeTab, setActiveTab] = useState("profile");
  const [editingField, setEditingField] = useState(null);
  const [tempProfile, setTempProfile] = useState(profileData);

  const handleEditClick = (section) => {
    setTempProfile(profileData);
    setEditingField(section);
  };

  const handleSave = () => {
    setProfileData(tempProfile);
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
                    <img src={profileData.image} alt="Profile" />
                  </div>
                  <div className="profile-info-container">
                    <h2 className="accountFullname">
                      {profileData.first_name} {profileData.last_name}
                    </h2>
                    <p className="accountDisplaytype">Admin</p>
                    <p className="accountDisplayemail">{profileData.email}</p>
                  </div>
                </div>

                {/* personal info-box */}
                <div className="personal-infoBox">
                  <h3 className="section-title">Personal Information </h3>
                  <div className="info-content">
                    <p>
                      <strong>First Name:</strong> {profileData.first_name}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {profileData.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {profileData.email}
                    </p>
                    <p>
                      <strong>Admin Code</strong> {profileData.admin_code}
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

                {/* account security */}
                <div className="account-securityBox">
                  <h3 className="content-title">Account Security</h3>
                  <div className="security-content">
                    <p>
                      <strong>Password:</strong> {profileData.password}
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

                {/* Logout */}
                <LogoutButton />
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
                      value={tempProfile.first_name}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Last Name:{" "}
                    <input
                      type="text"
                      value={tempProfile.last_name}
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
