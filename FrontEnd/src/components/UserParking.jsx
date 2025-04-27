import { useState, useEffect } from "react";
import "../css/UserParking.css";
import { Lot } from "./Lot";
import managerImage from "../assets/ManagerImage.png";
import { useGetFetch } from "../customHooks/useGetFetch";

export function UserParking({zone}) {

  const {data: zoneData, isPending, error, triggerGet} = useGetFetch();

  useEffect(() => {
    triggerGet(`http://localhost:8080/parkingZone/${zone}`)
  }, [])

  // ========= STATE: Modal, Filter, and Vehicle Selection =========
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  return (
    <>
      <section className="UserParking__section1">
        <div className="UserParking__container">
          {/* Title */}
          <div className="UserParking__header">
            <h2 className="UserParking__name">
              {zone} Zone
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
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
              >
                <option value="all">All vehicle types</option>
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            {/* Filter Buttons */}
            <div className="FilterButtons__controls">
              <button
                onClick={() => setStatusFilter("all")}
                className={`Button1 ${statusFilter === "all" ? "active" : ""}`}
              >
                Show All
              </button>
              <button
                onClick={() => setStatusFilter("vacant")}
                className={`Button2 ${statusFilter === "vacant" ? "active" : ""}`}
              >
                Available
              </button>
              <button
                onClick={() => setStatusFilter("occupied")}
                className={`Button3 ${statusFilter === "occupied" ? "active" : ""}`}
              >
                Occupied
              </button>
            </div>
          </div>

          {/* User Parking Box */}
          <div className="UserParking__box">
            <div className="row">
              {zoneData
                // .slice(0, Math.ceil(slotCount / 2))
                .map(( data, index ) => (
                  <Lot lotID={data.lot_id} status={data.parking_status} vehiclePlate = {data.vehicle_plate} vehicleType = {data.vehicle_type} key={index} statusFilter={statusFilter} vehicleFilter={vehicleFilter} />
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
