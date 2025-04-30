import { useState } from "react"

export function AdminTableFilter({columnFilters, setColumnFilters}) {
    const [vehicleType, setVehicleType] = useState("");

    const user_id = (columnFilters ?? []).find(
        filter => filter.id == "user_id"
    )?.value || ""

    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )
    
    const handleSelectVehicleType = (type) => {
        setVehicleType(type);
    
        setColumnFilters(
            prev => {
                // Check if there are any active filters for the vehicle type
                const hasFilter = prev.find(filter => filter.id === "vehicle_type")?.value
                // If there is a filter for vehicle type, update it
                if (hasFilter){
                    return prev.map(filter => {
                        if (filter.id === "vehicle_type") { 
                            return {... filter, value: type}
                        } else {
                            return filter  
                        }
                    })
                } else {
                    // If there is no filter for vehicle type, then create one
                    if (!hasFilter) {
                        return prev.concat({
                            id: "vehicle_type",
                            value: [type]
                        })
                    }
                } 
            }
        )
    };

    const clearVehicleFilter = () => {
        setVehicleType("");
        setColumnFilters(
            prev => {
                // Check if there are any active filters for the vehicle type
                const hasFilter = prev.find(filter => filter.id === "vehicle_type")?.value
                // If there is a filter for vehicle type, update it
                if (hasFilter){
                    return prev.map(filter => {
                        if (filter.id === "vehicle_type") { 
                            return {... filter, value: []};
                        } else {
                            return filter  
                        }
                    })
                };
                return prev;
            }
        )   
    }


    return(
        <div>
            {/* Inputgroup then  add more elements (design  stuff) */}
            <input 
                type="text"
                value={user_id}
                onChange={(e) => onFilterChange("user_id", e.target.value)}
            
            ></input>
            {/* You may use the className for design */}
            <div className = "filter">
                <button className="filter-btn" onClick={clearVehicleFilter}>
                    Show All
                </button>
                <button  className="filter-btn" onClick={() => handleSelectVehicleType("Motorcycle")}>
                    Motorcycle
                </button>
                <button className="filter-btn" onClick={() => handleSelectVehicleType("Car")}>
                    Car
                </button> 
            </div>
        </div>
    )
}