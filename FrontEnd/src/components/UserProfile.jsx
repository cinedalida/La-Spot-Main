// Import necessary modules and assets
import React, { useState, useEffect, useRef } from "react";
import penIcon from "../assets/pen.png";
import "../css/UserProfile.css";
import { LogoutButton } from "./Logoutbutton";
import { useAuth } from "../customHooks/AuthContext";
import { useGetFetch } from "../customHooks/useGetFetch";
import { usePutFetch } from "../customHooks/usePutFetch"
import { UserProfileHistoryTable } from "./UserProfileHistoryTable";

// Main functional component
export function UserProfile() {
  const { data: profileData, isPending, error, triggerGet } = useGetFetch();
  const { data: updatedProfileData, isPending: updatingProfile, error: updateError, triggerPut} = usePutFetch();
  const inputRefs = useRef({})


  const {auth, setAuth} = useAuth();
  const [username, setUsername] = useState(auth.username)
  // State for storing parking history
  const [parkingHistory, setParkingHistory] = useState([]);

  // State to track which tab is currently active (profile or history)
  const [activeTab, setActiveTab] = useState("profile");

  // State to track which section is being edited
  const [editingField, setEditingField] = useState(null);

  // Temporary profile data used while editing
  const [tempProfile, setTempProfile] = useState({});

  const [errors, setErrors] = useState({});
  const [putProfileData, setPutProfileData] = useState({})
  const [refreshKey, setRefreshKey] = useState(0);



  useEffect(() => {
    triggerGet(`http://localhost:8080/profile/${username}`)
  }, [refreshKey])


  useEffect(() => {
    if (profileData && profileData.length !== 0) {
      setTempProfile(profileData[0]);
    }
  }, [profileData])

  // Load saved profile and initialize history when component mounts
  useEffect(() => {
    // const savedProfile = JSON.parse(localStorage.getItem("profile"));
    // if (savedProfile) setProfile(savedProfile);

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

  // Function to start editing a specific section
  const handleEditClick = (section) => {

    // Ensures that the input fields for security are cleared and preped for user inputs 
    if (section === "security") {
      setTempProfile({...profileData[0], account_password: "", newPassword: "", confirmPassword: "", })
    } else {
      setTempProfile(profileData[0]); // copy current profile to temp state
    }

    setEditingField(section); // set which field is being edited
  };

  // Function to validate input and initialize put data
  const handleSave = () => {
    const namePattern = /^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$/;
    const schoolEmailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@dlsud\.edu\.ph$/;
    const emailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let newErrors = {}

    // Validating personal information
    if (editingField === "personal"){
      if (namePattern.test(tempProfile.first_name) === false){
          newErrors["first_name"] = true;
          inputRefs.current["first_name"].placeholder = "Invalid first name format";
          // inputRefs.current["first_name"].classList.add("invalid-input");
          tempProfile["first_name"] = "";
      }
      if (namePattern.test(tempProfile.last_name) === false){
        newErrors["last_name"] = true;
        inputRefs.current["last_name"].placeholder = "Invalid last name format"
        tempProfile["last_name"] = "";
      }

      if (auth.accountType === "Student") {
        if (schoolEmailPattern.test(tempProfile.email) === false){
          newErrors["email"] = true;
          inputRefs.current["email"].placeholder = "Invalid school email format"
          tempProfile["email"] = "";
        }
      } else if (auth.accountType === "Worker") {
        if (emailPattern.test(tempProfile.email) === false) {
          newErrors["email"] = true;
          inputRefs.current["email"].placeholder = "Invalid email format"
          tempProfile["email"] = "";
        }
      }
    }

    // Validating security information
    if (editingField === "security"){
      if (tempProfile.newPassword !== tempProfile.confirmPassword) {
        newErrors["confirmPassword"] = true;
        inputRefs.current["confirmPassword"].placeholder = "Password does not match"
        tempProfile["confirmPassword"] = "";
      }
    }

    // If there's an error, display it
    if (Object.keys(newErrors).length !== 0 ) {
      setErrors(newErrors)
      console.log("Error state", newErrors)
    } else {
      // if no errors, update the profile data
      
      // PUT data initialization
      if (editingField === "personal"){
        setPutProfileData({
          "first_name": tempProfile.first_name,
          "last_name": tempProfile.last_name,
          "email": tempProfile.email.toUpperCase(),
          "username": auth.username
        })
      } else if (editingField === "security") {
        setPutProfileData({
          "password": tempProfile.newPassword,
          "username": auth.username
        })
      }
      
    }
  };

  useEffect(() => {
    console.log("please work put, please")
    if (Object.keys(putProfileData).length !== 0) {
      console.log("editing field to be sent:", editingField);
      console.log("put data to be sent:", putProfileData);
      triggerPut(`http://localhost:8080/profile-update/${editingField}`, putProfileData)
    }
  }, [putProfileData])

  useEffect(() => {
    if (Object.keys(updatedProfileData).length !== 0) {
      if (updatedProfileData.isValid === true) {
        setRefreshKey(prevKey => prevKey + 1);
        setEditingField(null); // close modal
      } else {
        let newErrors = {}

        if (updatedProfileData.errorFiel === "email"){
          newErrors["email"] = true;
          inputRefs.current["email"].placeholder = updatedProfileData.message
          tempProfile["email"] = "";
        }
      }
    }
  }, [updatedProfileData])

  const handleCancel = () => {
    setEditingField(null);
    setErrors({});
  }

  // Update temporary profile while editing
  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };


  if (!profileData || profileData.length === 0) {
    return "Fetching data";
  }

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
                <h2 className="My-profile-title">My Profile {auth.accountType}{auth.username}</h2>
                <div className="profile-header">
                  <div className="profile-image-container">
                    <img src={"./images/userProfile.jpg"} alt="Profile" />
                  </div>
                  <div className="profile-info-container">
                    <h2 className="accountFullname">
                      {profileData[0].first_name} {profileData[0].last_name}
                    </h2>
                      <p className="accountDisplaytype">{profileData[0].account_type}</p>
                      <p className="accountDisplayemail">{profileData[0].email}</p>
                      
                  </div>
                </div>

                {/* Personal Information section */}
                <div className="personal-infoBox">
                  <h3 className="section-title">Personal Information </h3>
                  <div className="info-content">
                    <p>
                      <strong>First Name:</strong> {profileData[0].first_name}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {profileData[0].last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {profileData[0].email}
                    </p>
                    <p>
                      <strong>Student Number:</strong> {profileData[0].user_id}
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
                      <strong>Password:</strong> {profileData[0].account_password}
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
                      <strong>Type of Vehicle:</strong> {profileData[0].vehicle_type}
                    </p>
                    <p>
                      <strong>Plate Number:</strong> {profileData[0].vehicle_plate}
                    </p>
                  </div>
                  {/* <div className="edit-button-container">
                    <button
                      onClick={() => handleEditClick("vehicle")}
                      className="edit-button"
                    >
                      Edit <img src={penIcon} alt="Edit" className="pen-icon" />
                    </button>
                  </div> */}
                </div>
                {/* Logout Button */}
                <LogoutButton />
              </div>
            ) : (
              // History tab content
              <div>
                <div className="parking-history-box">
                  <h2 className="content-title-table">History</h2>

                  <UserProfileHistoryTable/>

                  {/* Loop through history array and render each record */}
                  {/* <table className="__table__">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time In</th> 
                        <th>Time Out</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>                     
                      {parkingHistory.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.date}</td>
                          <td>{entry.timeIn}</td>
                          <td>{entry.timeOut}</td>
                          <td>{entry.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
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
                      value={tempProfile.first_name}
                      ref={(el) => (inputRefs.current)["first_name"] = el}
                      className={errors["first_name"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("first_name", e.target.value) }
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      value={tempProfile.last_name}
                      ref={(el) => (inputRefs.current)["last_name"] = el}
                      className={errors["last_name"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("last_name", e.target.value)}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={tempProfile.email}
                      ref={(el) => (inputRefs.current)["email"] = el}
                      className={errors["email"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </label>
                  {/* <label>
                    Student Number:
                    <input
                      type="text"
                      value={tempProfile.user_id}
                      onChange={(e) =>
                        handleChange("studentNumber", e.target.value)
                      }
                    />
                  </label> */}
                </>
              )}

              {/* Edit Security Info */}
              {editingField === "security" && (
                <>
                  <label>
                    Current Password:
                    <input
                      type="password"
                      value={tempProfile.account_password}
                      ref={(el) => (inputRefs.current)["account_password"] = el}
                      className={errors["account_password"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("account_password", e.target.value)}
                    />
                  </label>
                  <label>
                    New Password:
                    <input
                      type="password"
                      value={tempProfile.newPassword}
                      ref={(el) => (inputRefs.current)["newPassword"] = el}
                      className={errors["newPassword"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("newPassword", e.target.value)}
                    />
                  </label>
                  <label>
                    Confirm Password:
                    <input
                      type="password"
                      value={tempProfile.confirmPassword}
                      ref={(el) => (inputRefs.current)["confirmPassword"] = el}
                      className={errors["confirmPassword"] ? "invalid-input" : ""}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                  </label>
                </>
              )}

              {/* Edit Vehicle Info
              {editingField === "vehicle" && (
                <>
                  <label>
                    Type of Vehicle:
                    <input
                      type="text"
                      value={tempProfile.vehicle_type}
                      onChange={(e) =>
                        handleChange("vehicleType", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Plate Number:
                    <input
                      type="text"
                      value={tempProfile.vehicle_plate}
                      onChange={(e) =>
                        handleChange("plateNumber", e.target.value)
                      }
                    />
                  </label>
                </>
              )} */}

              {/* Buttons to save or cancel editing */}
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button
                onClick={() => handleCancel()}
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
