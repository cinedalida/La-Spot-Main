// import "../css/test.css"


export function ParkingZoneButton({zone, vacantNum, occupiedNum}) {

    return(
        
        <>
            <button className ="parking-area" >
                <img src={`/images/parkingzone${zone}.png`} alt={`parkingzone${zone}`}></img>
                <h3 className="area-name"> {zone} </h3>
                <div className="slot-summary">
                    <div>
                        <span className="availability-title"> Available Spots: </span>
                        <span className="available-counter">{vacantNum}</span>
                    </div>
                    <div>
                        <span className="occupied-title">Occupied Spots:</span>
                        <span className="occupied-counter">{occupiedNum}</span>
                    </div>
                </div>
            </button>
        </>
    )
}


// {areas.map((area, index) => {
//     const available = area.slots.filter((s) => !s.occupied).length;
//     const occupied = area.slots.filter((s) => s.occupied).length;

//     return (
//         <div key={index} className="parking-area">
//             <img className="area-image" src={area.image} alt={area.id} />
//             <h3 className="area-name">{area.id}</h3>
//             <div className="slot-summary">
//                 <div>
//                 <span className="availability-title">
//                     Available Spots:
//                 </span>
//                     <span className="available-counter">{available}</span>
//                 </div>
//                 <div>
//                     <span className="occupied-title">Occupied Spots:</span>
//                     <span className="occupied-counter">{occupied}</span>
//                 </div>
//             </div>
//         </div>
//     );
// })}