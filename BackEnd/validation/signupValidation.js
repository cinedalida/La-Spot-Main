import connection from "../config/connectDB.js";

export function checkExistingUserData(email, id, licensePlate) {
    return new Promise((resolve, reject) => {
        console.log("Checking existing user data...")

        const querySQL = "SELECT user_information.user_id, user_information.email, NULL AS vehicle_plate " +
        "FROM user_information " +
        "WHERE user_information.user_id = ? OR user_information.email = ? " + 
        "UNION " +
        "SELECT NULL AS user_id, NULL AS email, vehicle.vehicle_plate " +
        "FROM vehicle " +
        "WHERE vehicle.vehicle_plate = ?"

        connection.query(querySQL, [id, email, licensePlate], (error, results) => {
            console.log("Validation Results:", results);
            if (error) {
                console.log(error);
                return reject(error);
            } else {
                let validationError = {}

                results.forEach((user) => {
                    if (user.email === email) {
                        validationError.email = "Email already exists";
                    }
                    if (user.user_id === id) {
                        validationError.userId = "User ID already exists";
                    }
                    if (user.vehicle_plate === licensePlate) {
                        validationError.vehicle = "Vehicle already exists";
                    }
                });
                
                if (Object.keys(validationError).length !== 0) {
                    validationError.exist = true;
                } else {
                    validationError.exist = false;
                }

                console.log(validationError);
                resolve(validationError);
                
            }
        })
    })
}

export function checkExistingAdminData(adminCode) {
    return new Promise((resolve, reject) => {
        const querySQL = " SELECT * FROM admin_codes WHERE admin_code = ?";

        connection.query(querySQL, adminCode, (error, results) => {
            if (error) {
                console.log(error);
                return reject(error);
            } else {
                console.log("Admin Code Validation Results:", results);
                let validationError = {}

                if (Object.keys(results).length === 0 ) {
                    validationError.error ="Invalid Admin Code";
                } else if (results.is_used === true) {
                    validationError.error = "Admin Code already used";
                } 
                
                resolve(validationError);

            }
        })
    })
}