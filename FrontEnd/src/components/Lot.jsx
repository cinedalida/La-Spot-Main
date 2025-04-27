import "../css/Lot.css"

export function Lot({classStyle, lotID}) {
    
    return(
        <>
            <div className={classStyle}>{lotID}</div>
        </>
    )
}