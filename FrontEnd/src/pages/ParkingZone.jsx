import { useParams } from 'react-router-dom';
import { ParkingZone as ParkingZoneComponent } from '../components/ParkingZone';
import { Header2 } from '../components/Header2';


export function ParkingZone() {
    const { zone } = useParams();

    return (
        <>
            <Header2 />
            <ParkingZoneComponent zone={zone} />
            
        </>
    )
}