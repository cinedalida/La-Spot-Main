import "../css/UserParking.css";

export function Lot({lotID, status}) {
    
    return(
        <>
            <div
                className="slot"
            >
                <p className="slot-label">A{lotID}</p>
                <div
                    className="indicator"
                    style={{ backgroundColor: status == "occupied" ? "red" : "green" }}
                ></div>
            </div>
        </>
    )
}