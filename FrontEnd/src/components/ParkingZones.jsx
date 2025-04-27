import { ParkingZoneButton } from "./ParkingZoneButton"
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useGetFetch } from "../customHooks/useGetFetch"
import { useAuth } from "../customHooks/AuthContext";
import "../css/test.css"

export function ParkingZones() {
    
    const {data: zones, isPending, error, triggerGet} = useGetFetch();
    
    useEffect(() => {
        triggerGet("http://localhost:8080/parkingZones")
    }, [])
    


    return (
        <div className="main-grid">
            <h1>This is the parking lot page</h1><br/>
            {error && <div>{error}</div>}
            {isPending && <p>Loading...</p>}
            { zones &&
                <div className="parking-area-grid-3x3">
                    {zones.map((zone) => {
                    return (
                        <Link key={zone.zone} to={`/parkingZone/${zone.zone}`}>
                            <ParkingZoneButton zone={zone.zone} vacantNum = {zone.vacantNum} occupiedNum = {zone.occupiedNum}/>
                        </Link>
                    )
                    })}
                </div>
            }

        </div>
    )
}