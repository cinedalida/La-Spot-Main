import connection from "../config/connectDB.js";
import * as signUpValidation from "../validation/signupValidation.js";
import bcrypt from "bcrypt";

export const signupPost = async (req, res) => {
    const { accountType } = req.body;

    // Student and Worker Account Creation
    if (accountType === "Student" || accountType === "Worker") {
        const { firstName, lastName, email, userId, password, vehicle, licensePlate } = req.body;
        console.log(accountType);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(userId);
        console.log(password);
        console.log(vehicle);
        console.log(licensePlate);

        try {
            const resultCheckExistingUserData = await signUpValidation.checkExistingUserData(email, userId, licensePlate);
            if (resultCheckExistingUserData.exist == true) {
                console.log("user already exist")
                resultCheckExistingUserData.accountType = accountType;
                console.log(resultCheckExistingUserData);
                return res.json(resultCheckExistingUserData);
                
            } else {
                console.log("use does not exist, proceeding to insertion")
                const queryInsertUserInformation = "INSERT INTO user_information(user_id, account_type, first_name, last_name, email, account_password) " +
                "VALUES(?, ?, ?, ?, ?, ?)";
                const queryInsertVehicleInformation = "INSERT INTO vehicle(vehicle_plate, vehicle_type, user_id) " +
                "VALUES(?, ?, ?)"
                const hashedPassword = await bcrypt.hash(password, 10);
                const valuesInsertUserInformation = [userId, accountType, firstName, lastName, email, hashedPassword];
                const valuesInsertVehicleInformation = [licensePlate, vehicle, userId];

                connection.query(queryInsertUserInformation, valuesInsertUserInformation, (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.json({ error: "User Information Database error"})
                    } else {
                        console.log("vehicle insertion intialization...")
                        connection.query(queryInsertVehicleInformation, valuesInsertVehicleInformation, (error, results) => {
                            console.log("vehicle insertion ...")
                            if (error) {
                                console.log(error);
                                return res.json({error: "Vehicle Database error"})
                            } else {
                                console.log("Vehicle inserted successfully");
                                return res.json({ success: true})
                            }
                        });
                    }
                })
            }
        
        } catch (error) {
            console.log(error)
        }
        
    
    }

    // Admin Account Creation
    if (accountType === "Admin") {
        const { firstName, lastName, adminCode, password} = req.body;
        console.log(accountType);
        console.log(firstName);
        console.log(lastName);
        console.log(adminCode);
        console.log(password);
    
        console.log(req.body);

        try{
            console.log("Proceeding to check existing admin code...")
            const resultCheckExisitingAdminData = await signUpValidation.checkExistingAdminData(adminCode);

            if (Object.keys(resultCheckExisitingAdminData).length > 0){
                return res.json(resultCheckExisitingAdminData);
            } else {
                console.log("Admin code is valid, proceeding to insertion...")
                const queryInsertAdminInformation = "INSERT INTO admin_information(admin_code, first_name, last_name, account_password)  " +
                "VALUES(?, ?, ?, ?)"
                const hashedPassword = await bcrypt.hash(password, 10);
                const valuesInsertAdminInformation = [adminCode, firstName, lastName, hashedPassword];

                const queryUpdateAdminCode = "UPDATE admin_codes SET is_used = true WHERE admin_code = ?";

                connection.query(queryInsertAdminInformation, valuesInsertAdminInformation, (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.json({error: "Admin Information Database error"})
                    } else {
                        console.log("Admin Information inserted successfully, proceeding to updating admin code...")
                        connection.query(queryUpdateAdminCode, adminCode, (error, results) => {
                            if (error) {
                                console.log(error);
                                return res.json({error: "Admin Code Database error"})
                            } else {
                                console.log("Admin Code updated successfully")
                                return res.json({ success: true})
                            }
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error);
            return res.json({error: "Admin Code Database error"})
        }
    }

}