import express from "express"
import * as signupControllers from "../controllers/signupControllers.js";
import * as parkingControllers from "../controllers/parkingControllers.js";
import * as otherAdminControllers from "../controllers/otherAdminControllers.js";
import * as authControllers from "../controllers/authControllers.js"
import * as refreshTokenControllers from "../controllers/refreshTokenController.js"
import * as logoutControllers from "../controllers/logoutControllers.js"
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyAccountType } from "../middleware/verifyAccountType.js";



let router = express.Router();

let initWebRoutes = (app) => {
    

    // Signup
    router.post("/signup", signupControllers.signupPost);

    // Login Authentication
    router.post("/login", authControllers.handleLogin)

    // Refresh Tokken key
    router.get("/refresh", refreshTokenControllers.handleRefreshToken)

    // Logout
    router.post('/logout', logoutControllers.handleLogout)

    // Parking User \\
    
    // Will get the list of parking zone and the number of available and occupied spot
    router.get("/parkingZones", /* verifyJWT, verifyAccountType("Student", "Worker"), */ parkingControllers.parkingZones)

    // Will get all of the lot data in a parking zone
    router.get("/parkingZone/:zone", /* verifyJWT, */ parkingControllers.parkingZone)


    // Parking Admin \\

    // Will get all of the lot data in a parking zone (admin)
    router.get("/parkingOverviewAdmin/:selectedZone", /* verifyJWT, verifyAccountType("admin"), */ parkingControllers.parkingOverviewAdmin)

    // Will POST the vehicle data to the parking zone
    router.post("/adminViewZone/parkVehicle", /* verifyJWT, */ parkingControllers.parkVehicle)

    // Will DELETE the vehicle data from the parking zone
    router.delete("/adminViewZone/vacatingParkingSpace/:vehiclePlate", /* verifyJWT, */ parkingControllers.vacatingParkingSpace)


    // Account Admin \\
    router.get("/accountRecord", /* verifyJWT, */ otherAdminControllers.accountRecord)

    // Account History \\
    router.get("/adminHistory", /* verifyJWT, */ otherAdminControllers.adminParkingHistory)



    return app.use("/", router);
}

export default initWebRoutes;