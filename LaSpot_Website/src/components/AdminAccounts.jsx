import "../css/AdminAccounts.css";
import React, { useState } from "react";

export function AdminAccounts() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <>
      {/* TOP CONTENT */}
      <section className="adminAccounts section" id="adminAccounts">
        <div className="adminAccounts__container">
          <div className="adminAccounts__content">
            <h1 className="adminAccounts__title">Accounts</h1>
            <p className="description">
              Select account tags to view students and workers.
            </p>
          </div>
        </div>
      </section>

      {/* TABLES */}
      <section className="adminAccountsLayout">
        <div className="adminAccountsLayout__container">
          <div className="adminAccountsTable__container">
            {/* SIDE ACCOUNTS */}
            <div className="accountsCategoryTable__container">
              <div className="accountsCategoryTable__content">
                {/* BUTTONS */}
                <button
                  className={`accountsButton ${
                    activeTab === "students" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("students")}
                >
                  Students
                </button>
                <button
                  className={`accountsButton ${
                    activeTab === "workers" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("workers")}
                >
                  Workers
                </button>
              </div>
            </div>

            <div className="accountsTable__container">
              <div className="accountsTable__content">
                <h1 className="accountsTable__title">
                  {activeTab === "students"
                    ? "Student Accounts"
                    : "Worker Accounts"}
                </h1>
                {activeTab === "students" ? (
                  <table className="accountsTable">
                    <thead>
                      <tr>
                        <th>Student Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Vehicle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>202330444</td>
                        <td>Janny Cake</td>
                        <td>j.cake@gmail.com</td>
                        <td>Car</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>202330444</td>
                        <td>Ojji Cake</td>
                        <td>o.cake@gmail.com</td>
                        <td>Car</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="accountsTable">
                    <thead>
                      <tr>
                        <th>Worker ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Vehicle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>001</td>
                        <td>Matti Cake</td>
                        <td>m.cake@gmail.com</td>
                        <td>Car</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
