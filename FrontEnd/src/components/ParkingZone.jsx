import { useEffect } from 'react'
import { useGetFetch } from '../customHooks/useGetFetch'
import { Lot } from '../components/Lot'
import "../css/Lot.css"

export function ParkingZone({zone}) {

    const { data: zoneData, isPending, error, triggerGet } = useGetFetch();

    useEffect(() => {
            triggerGet(`http://localhost:8080/parkingZone/${zone}`)
        }, [])


    return (
        <>
            <p>top</p>
            <p>top</p>
            <p>top</p>
            <p>Margin top</p>
            <h1>This is the parking zone: {zone} </h1>
            <p>Please talk to me</p>
            <p> Please work</p>
            <p> Select vehicle. Viewspot. Choose spot. </p>
            <br/><br/>
            {isPending && <p>Loading...</p>}
            {error && <p> Error: {error.message}</p>}
            {zoneData &&
                <div className="parking-lot">
                {zoneData.map((data, index) => {
                    return (
                        <Lot classStyle={`parkingSlot${data.parking_status}`} lotID={data.lot_id} key={index} />

                    )
                })}
                </div>
            }

        </>
    )
}