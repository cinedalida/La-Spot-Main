import  { Outlet } from "react-router-dom";

// import { TempNav } from "./TempNav";
import { Header1 } from "./Header1";
import { Header2 } from "./Header2";
import { Header3 } from "./Header3";
import { Footer } from "./Footer";
import { ScrollUp } from "./ScrollUp";

export function Layout(){
    return(
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
            <ScrollUp />
        </>
    )
}
