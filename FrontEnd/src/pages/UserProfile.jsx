import React, { useState } from "react";
import { Header2 } from "../components/Header2"
import { UserProfile as UserProfileComponent } from "../components/UserProfile"

export function UserProfile() {
    const [refreshPage, setRefreshPage] = useState(false);

    const triggerRefreshPage = () => {
        setRefreshPage(prev => !prev); 
    }

    return(
        <>
            <Header2 refreshPage={refreshPage} />
            <UserProfileComponent triggerRefreshPage={triggerRefreshPage} refreshPage={refreshPage} />
        </>
    )
}