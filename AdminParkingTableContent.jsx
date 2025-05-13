import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { usePostFetch } from "../customHooks/usePostFetch";
import { usePutFetch } from "../customHooks/usePutFetch";
import React from "react";
import { useAuth } from "../customHooks/AuthContext";

// USELESS PAGE


export function AdminParkingTableContent({
    onRefresh,
    visible,
    lot_id : lotID, 
    zone, 
    parking_status : parkingStatus, 
    user_id: userID, 
    account_type: accountType, 
    vehicle_type : vehicleType, 
    vehicle_plate : vehiclePlate, 
    occupied_at : occupiedAt
    }) {
    // Initialization \\

    const inputRef = useRef(null);
    const [carPlate, setCarPlate] = useState(vehiclePlate || "");
    const {auth, setAuth} = useAuth();
    
    // CUSTOM HOOKS \\

    // Will POST the CarPlate for Vehicle Allocation
    const {data: isVehiclePostSucess, isPending: isPostPending, error: postError, triggerPost} = usePostFetch()
    // Will DELETE the vehicle from the lot
    const {data: isPutSucess, isPending: isPutPending, error: putError, triggerPut} = usePutFetch()
    
    
    // USE EFFECTS \\

    
    // Codes after the Post Operation
    useEffect(() => {
        if (Object.keys(isVehiclePostSucess).length !== 0){
                console.log(isVehiclePostSucess)
            if (isVehiclePostSucess.isValid == true){
                console.log(isVehiclePostSucess.message)
                onRefresh();
            } else {
                setCarPlate("");
                inputRef.current.placeholder = isVehiclePostSucess.message  
            }
        }
    }, [isVehiclePostSucess])


    // Codes after the Delete Operation
    useEffect(() => {
        if (Object.keys(isPutSucess).length !== 0) {
            if (isPutSucess.isValid == true) {
                console.log(isPutSucess.message)
                onRefresh();
            } else {
                console.log(isPutSucess.message)
            }
        }
    }, [isPutSucess])

    // Will update the vehicle plate when the user types something in the input field
    useEffect(() => {
        setCarPlate(vehiclePlate || "") 
    }, [vehiclePlate])


    // Event Handler \\

    // On enter, this will validate the Vehicle Plate (regular expression, and query call)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(carPlate)
            const carPlatePattern = /^(?=(?:.*\d){3,4})(?=(?:.*[A-Z]){3})[A-Z0-9]{6,7}$/;

            if (!carPlate.match(carPlatePattern)) {
                setCarPlate("")
                inputRef.current.placeholder = "Invalid plate number"
            } else {
                // This will run the POST Hook
                const ID = auth.ID;
                triggerPost("http://localhost:8080/adminViewZone/parkVehicle", {lotID, zone, carPlate, ID} )
            }
        }
    }
    // Will Trigger the PUT Custom Hook
    const handleDelete = () => {
        console.log("Initiating delete...");
        console.log("deleting this vehilce plate:",vehiclePlate);
        const ID = auth.ID;
        vehiclePlate ? triggerPut("http://localhost:8080/adminViewZone/vacatingParkingSpace", {vehiclePlate, ID}) : ""
    }
    
    if (visible !== "showAll"){
        if (visible === "student" && accountType !== "Student") return null;
        if (visible === "worker" && accountType !== "Worker") return null;
    } 
    
    return  (
        <> 
            
            <tr>
                
                <td>{lotID}</td>
                <td>
                    <form>
                    <input type = "text" id = "carPlate"
                        value = {carPlate}
                        onChange={(e) => setCarPlate(e.target.value)}
                        disabled = {vehiclePlate ? true : false}
                        ref = {inputRef}
                        onKeyDown={handleKeyDown}
                        onBlur={() => {inputRef.current.placeholder = ""}}
                    />
                    </form>
                </td>
                <td>{userID ? userID : ""}</td>
                <td>{accountType ? accountType : ""}</td>
                <td>{vehicleType ? vehicleType : ""}</td>
                <td>{occupiedAt ? new Date(occupiedAt).toLocaleDateString(): ""}</td>
                <td>{occupiedAt ? new Date(occupiedAt).toLocaleTimeString() : ""}</td>
                <td>
                    <button 
                        disabled = {!userID ? true: false} 
                        onClick={handleDelete}
                        > X 
                    </button>    
                </td>
            </tr>
        </>
        )
    }

