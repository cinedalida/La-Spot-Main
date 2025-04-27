import { useState, useEffect} from "react"
import { useGetFetch } from "../customHooks/useGetFetch";

import "../css/ParkingOverviewAdmin.css"

import TableBodyParkingAdmin from "./TableBodyParkingAdmin";

export function ParkingOverviewAdmin() {
    const [selectedZone, setSelectedZone] = useState("A");
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
        <div className = "OverviewAdminBody">
            <h1>Hello! This is the Parking Overview Admin</h1>
            <br/><br/><br/>

            <button type="button" onClick={() => setSelectedZone("A")}>Zone A</button>
            <button type="button" onClick = {() => setSelectedZone("B")}>Zone B</button>
            <button type="button" onClick = {() => setSelectedZone("C")}>Zone C</button>     

            <br/><br/><br/>
            <p>Available Spots: {numAvailable}</p>
            <p>Occupied Spots: {numOccupied}</p>
            <br/><br/><br/>

            <h2> Zone {selectedZone}</h2>
            {<button type="button" onClick = {() => setShow("showAll")}> Show All </button>}
            {<button type="button" onClick = {() => setShow("student")}> Student </button>}
            {<button type="button" onClick = {() => setShow("worker")}> Worker </button>}

            <br/><br/>
            <table className="parking-table">
                <thead>
                    <tr className="parking-table-header-row">
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
                <tbody className = "parking-table-body">
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
    )
}