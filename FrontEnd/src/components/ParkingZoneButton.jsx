import "../css/test.css"


export function ParkingZoneButton({zone, vacantNum, occupiedNum}) {

    return(
        <>
            <button className ="button" >
                <img src={`/images/parkinglot${zone}.jpg`} className="area-image"></img>
                <h3 className="area-name"> Parking Zone {zone}</h3>
                <div className="slot-summary">
                    <div>Vacant: {vacantNum}</div>
                    <div>Occupied: {occupiedNum}</div>
                </div>
            </button>
        </>
    )
}