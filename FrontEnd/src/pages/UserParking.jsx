import { useParams } from "react-router-dom";
import { Header2 } from "../components/Header2"
import { UserParking as UserParkingComponent } from "../components/UserParking"

export function UserParking() {
    const { zone } = useParams();

    return (
        <>
            <Header2 />
            <UserParkingComponent zone={zone} />
        </>
    )
}