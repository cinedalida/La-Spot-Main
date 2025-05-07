import React from "react"
import { useAuth } from "../customHooks/AuthContext";
import {Navigate, Outlet , useLocation} from "react-router-dom";

export function ProtectedRoutes() {

    const { auth, setAuth } = useAuth();

    const isLoggedIn = Boolean(auth?.accessToken);

    return isLoggedIn === true ? <Outlet/> : <Navigate to="/" />;
    
}