import "../css/AdminParking.css";
import { useGetFetch } from "../customHooks/useGetFetch.js";
import { TableBodyParkingAdmin } from "./TableBodyParkingAdmin.jsx"
import { useState, useEffect } from "react";

export function AdminParking() {
  // dynamic changes pa lang to, wala pang editing (ikaw na'to matti)
  const [selectedZone, setSelectedZone] = useState("ADG");
    const [show, setShow] = useState("showAll")
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }

    const {data: lots, isPending, error, triggerGet} = useGetFetch();
    
    useEffect(()=> {
        triggerGet(`http://localhost:8080/parkingOverviewAdmin/${selectedZone}`)
    }, [selectedZone, refreshKey])
    
    // Use these variables for the Parking Status
    const numAvailable = lots.filter((lot) => lot.parking_status === "vacant").length
    const numOccupied = lots.filter((lot) => lot.parking_status === "occupied").length

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
                  selectedZone === "ICTC" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("ICTC")}
              >
                ICTC Building
              </button>
              <button
                className={`locationButton ${
                  selectedZone === "Magdalo" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("Magdalo")}
              >
                Magdalo
              </button>
              <button
                className={`locationButton ${
                  selectedZone === "ADG" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("ADG")}
              >
                Ayuntamiento
              </button>
            </div>
          </div>

          <div className="parkingTable__container">
            <div className="parkingTable__content">
              <h1 className="parkingTable__title">Parking Spots</h1>
              <p>NOTE | Show toggle: Show All, Student, Worker</p>
              <p>NOTE | Shows capacity on right side</p>

              <br/><br/><br/>
              
              <p>Available Spots: {numAvailable}</p>
              <p>Occupied Spots: {numOccupied}</p>
              <br/><br/><br/>

              <h2> {selectedZone} Zone</h2>
              {<button type="button" onClick = {() => setShow("showAll")}> Show All </button>}
              {<button type="button" onClick = {() => setShow("student")}> Student </button>}
              {<button type="button" onClick = {() => setShow("worker")}> Worker </button>}

              <br/><br/>

              <table className="__table__">
                <thead>
                    <tr>
                        <th>Spot</th>
                        <th>Car Plate</th>
                        <th>ID Number</th>
                        <th>Account Type</th>
                        <th>Vehicle Type</th>
                        <th>Time In</th>
                        <th>Time Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {isPending && <tr><td>Loading...</td></tr>}
                {error && <tr><td>{error.message}</td></tr>}
                {lots && 
                    lots.map((lot, index)=>{
                        return(
                            <TableBodyParkingAdmin {...lot} key={index} visible = {show} onRefresh={handleRefresh}  />
                        )
                    })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
