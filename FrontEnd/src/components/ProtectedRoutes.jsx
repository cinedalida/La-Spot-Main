import React from "react"
import { useAuth } from "../customHooks/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export function ProtectedRoutes() {

    const { auth, setAuth } = useAuth();

    const isLoggedIn = Boolean(auth?.accessToken);

    return isLoggedIn ? <Outlet/> : <Navigate to="/" />;
    
}