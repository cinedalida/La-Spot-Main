import React, { useState } from "react";
import "../css/LogoutButton.css";

export function LogoutButton({ onLogoutClick }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onLogoutClick(); // call the passed prop after confirming

    // put stuff here


  };
  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="logout__buttons">
        <button className="btn btn-logout" onClick={handleLogoutClick}>
          <div className="button-text">Logout</div>
        </button>
      </div>

      {showConfirm && (
        <div className="popup">
          <div className="popup-content">
            <p className="popMessage">Are you sure you want to logout?</p>
            <button className="btn btn-confirm" onClick={handleConfirm}>
              Logout
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
