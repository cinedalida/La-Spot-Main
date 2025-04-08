import "../css/AdminParking.css";
import React, { useState } from "react";

export function AdminParking() {
  // dynamic changes pa lang to, wala pang editing (ikaw na'to matti)
  const [activeTab, setActiveTab] = useState("parkingOverview");

  return (
    <>
      {/* TOP CONTENT */}
      <section className="parkingOverview section" id="parkingOverview">
        <div className="parkingOverview__container">
          <div className="parkingOverview__content">
            <h1 className="parkingOverview__title">Parking Overview</h1>
            <p className="description">
              View the real-time summary of of all parking spots accross
              different locations in DLSU-D.
            </p>
          </div>
        </div>
      </section>
      {/* TABLES */}
      <section className="parkingLayout">
        <div className="parkingLayout__container">
          <div className="locationTable__container">
            <div className="locationTable__content">
              <h1 className="locationTable__title">Parking Spots</h1>
              <p className="locationTable__divider">Gate 1</p>
              {/* BUTTONS */}
              <button
                className={`locationButton ${
                  activeTab === "place1" ? "active" : ""
                }`}
                onClick={() => setActiveTab("place1")}
              >
                Ayuntamiento
              </button>
              <button
                className={`locationButton ${
                  activeTab === "place2" ? "active" : ""
                }`}
                onClick={() => setActiveTab("place2")}
              >
                ICTC Building
              </button>
            </div>
          </div>

          <div className="parkingTable__container">
            <div className="parkingTable__content">
              <h1 className="parkingTable__title">Parking Spots</h1>
              <p>NOTE | Show toggle: Show All, Student, Worker</p>
              <p>NOTE | Shows capacity on right side</p>
              {activeTab === "place1" ? (
                <table className="parkingTable">
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Spot</th>
                      <th>Name</th>
                      <th>Vehicle</th>
                      <th>Time-In</th>
                      <th>Time-Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>202330324</td>
                      <td>A15</td>
                      <td>Janny Cake</td>
                      <td>Car</td>
                      <td>1:00PM</td>
                      <td>3:00PM</td>
                      <td>Occupied</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="parkingTable">
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Spot</th>
                      <th>Name</th>
                      <th>Vehicle</th>
                      <th>Time-In</th>
                      <th>Time-Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>202330444</td>
                      <td>A1</td>
                      <td>Matii Cake</td>
                      <td>Car</td>
                      <td>1:00PM</td>
                      <td>4:00PM</td>
                      <td>Occupied</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
