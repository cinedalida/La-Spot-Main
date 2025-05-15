import React, { useState } from "react";
import { Header3 } from "../components/Header3"
import { AdminProfile as AdminProfileComponent } from "../components/AdminProfile"

export function AdminProfile() {
    const [refreshPage, setRefreshPage] = useState(false);
    
    const triggerRefreshPage = () => {
        setRefreshPage(prev => !prev); 
    }

    return (
        <>
            <Header3 refreshPage={refreshPage}/>
            <AdminProfileComponent triggerRefreshPage={triggerRefreshPage} refreshPage={refreshPage}/>
        </>
    )
}