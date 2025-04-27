import "../css/UserParkingView.css";
import { useState } from "react";
import areaImage from "../assets/g1__magdalo.png";
import reminderImage from "../assets/reminder-picture.png";

export function UserParkingView() {
  const initialAreas = [
    {
      id: "Gate 1",
      image: areaImage,
      slots: [
        { id: "A1", occupied: false },
        { id: "A2", occupied: true },
        { id: "A3", occupied: false },
      ],
    },
    {
      id: "Gate 2",
      image: areaImage,
      slots: [
        { id: "B1", occupied: true },
        { id: "B2", occupied: false },
      ],
    },
    {
      id: "Gate 3",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Gate 4",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Gate 5",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Ayunta",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
  ];

  const [areas] = useState(initialAreas);

  return (
    <>
      {/* Title and Description */}
      <section className="UserParkingView__section1">
        <div className="ParkingView__container">
          <div className="ParkingView__header">
            <h2 className="ParkingView__Title">Parking Spots</h2>
            <p className="ParkingView__description">Check and pick a spot!</p>
          </div>
        </div>
      </section>
      {/* Cards View Parking */}
      <section className="UserParkingView__section2">
        <div className="ParkingView__container">
          <div className="ParkingView__content">
            {areas.map((area, index) => {
              const available = area.slots.filter((s) => !s.occupied).length;
              const occupied = area.slots.filter((s) => s.occupied).length;

              return (
                <div key={index} className="parking-area">
                  <img className="area-image" src={area.image} alt={area.id} />
                  <h3 className="area-name">{area.id}</h3>
                  <div className="slot-summary">
                    <div>
                      <span className="availability-title">
                        Available Spots:
                      </span>
                      <span className="available-counter">{available}</span>
                    </div>
                    <div>
                      <span className="occupied-title">Occupied Spots:</span>
                      <span className="occupied-counter">{occupied}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Reminder */}
      <section className="UserParkingView__section3">
        <div className="ParkingView__container">
          <div className="ParkingView__reminder">
            <div className="ParkingView__reminder-content">
              <h1 className="reminder-title">Reminder</h1>
              <img
                className="reminder-image"
                src={reminderImage}
                alt="Reminder"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
