import { useState } from "react";
import "../css/UserParking.css";
import managerImage from "../assets/ManagerImage.png";

export default function UserParking() {
  // ========= STATE: Parking Information =========
  const [parkingInformation] = useState({
    parkingName: "<Parking Place Name>",
    parkingSize: 14,
  });

  // ========= STATE: Slot Availability Data (from DB) =========
  const initialSlots = [
    { occupied: true },
    { occupied: true },
    { occupied: true },
    { occupied: true },
    { occupied: false },
  ];
  const slotCount = parkingInformation.parkingSize;
  const [slots, setSlots] = useState(initialSlots);

  // ========= STATE: Modal, Filter, and Vehicle Selection =========
  const [modal, setModal] = useState({ show: false, index: null });
  const [filter, setFilter] = useState("all");
  const [vehicleType, setVehicleType] = useState("Sedan");

  // ========= EVENT HANDLERS =========
  const handleSlotClick = (index) => {
    setModal({ show: true, index });
  };

  // ========= FILTERED SLOTS BASED ON STATUS =========
  const filteredSlots = slots
    .map((slot, index) => ({ ...slot, index }))
    .filter(({ occupied }) => {
      if (filter === "available") return !occupied;
      if (filter === "occupied") return occupied;
      return true;
    });

  return (
    <>
      <section className="UserParking__section1">
        <div className="UserParking__container">
          {/* Title */}
          <div className="UserParking__header">
            <h2 className="UserParking__name">
              {parkingInformation.parkingName}
            </h2>
            <h3 className="UserParking__description">
              <i>Select vehicle. View spot. Choose spot.</i>
            </h3>
          </div>

          {/* Controls: Filter buttons and vehicle selector */}
          <div className="UserParking__controls">
            {/* Vehicle Type Selector */}
            <div className="VehicleSelector__controls">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            {/* Filter Buttons */}
            <div className="FilterButtons__controls">
              <button
                onClick={() => setFilter("all")}
                className={`Button1 ${filter === "all" ? "active" : ""}`}
              >
                Show All
              </button>
              <button
                onClick={() => setFilter("available")}
                className={`Button2 ${filter === "available" ? "active" : ""}`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter("occupied")}
                className={`Button3 ${filter === "occupied" ? "active" : ""}`}
              >
                Occupied
              </button>
            </div>
          </div>

          {/* User Parking Box */}
          <div className="UserParking__box">
            <div className="row">
              {filteredSlots
                .slice(0, Math.ceil(slotCount / 2))
                .map(({ occupied, index }) => (
                  <div
                    key={index}
                    className="slot"
                    onClick={() => handleSlotClick(index)}
                  >
                    <p className="slot-label">A{index + 1}</p>
                    <div
                      className="indicator"
                      style={{ backgroundColor: occupied ? "red" : "green" }}
                    ></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section2 with bg and reminder info */}
      <section className="UserParking__section2">
        <div className="UserParking__title">Get Spot!</div>
        {/* Manager Image */}
        <div className="managerImage">
          <img src={managerImage} alt="Manager" />
        </div>
      </section>
    </>
  );
}
