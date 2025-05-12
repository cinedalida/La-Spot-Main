import connection from "../config/connectDB.js";
import * as profileValidation from "../validation/profileValidation.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bcrypt from "bcrypt";

export const userProfileData = (req, res) => {
    const { ID } = req.params;

    const sqlQeuryUserProfile = `SELECT user_information.user_id, user_information.account_type, user_information.first_name, user_information.last_name, user_information.email, vehicle.vehicle_plate, vehicle.vehicle_type
    FROM user_information
    LEFT JOIN vehicle ON user_information.user_id = vehicle.user_id
    WHERE user_information.user_id =  ?`

    connection.query(sqlQeuryUserProfile, [ID], (err, profileData) => {
        if (err) {
            return res.status(500).json({isValid: false, message: "Database query failed"})
        }
            
        profileData.account_password
        console.log(profileData);
        res.json(profileData)
    })
}

export const updateProfileDataPersonal = async (req, res) => {
    
    const { first_name, last_name, email, ID, editingField} = req.body
    
    console.log(first_name, last_name, email, ID);
    // Will check the existence of the email in the table
    const EmailError = await profileValidation.checkExistingEmail(email, ID);
    console.log("email error checking", EmailError)
    if (EmailError){
        return res.status(400).json({isValid: false, errorField: "email", message: "Email already exists"})
    } 

    // Will update the personal information of the user
    const sqlQueryUpdatePersonalProfile = `UPDATE user_information
        SET first_name = ?, last_name = ?, email = ?
        WHERE user_id = ?`

    connection.query(sqlQueryUpdatePersonalProfile, [first_name, last_name, email, ID], (err, data) => {
        if (err){
            return res.status(500).json({isValid: false, message: "Database query failed"})
        } else {
            res.json({isValid: true, message: "Profile Personal Data successfully updated"})         
        }
    })
}


export const updateProfileDataSecurity = async (req, res) => {
    const {password, currentPassword, ID } = req.body;

    console.log(password, ID, currentPassword)

    try{
        const passwordResult = () => {
            return new Promise((resolve, reject) => {
                const sqlQuerySearchPasswordProfile = `SELECT account_password FROM user_information WHERE user_id = ?`
                connection.query(sqlQuerySearchPasswordProfile, [ID], (err, results) => {
                    if (err) {
                        return reject({ status: 500, isValid: false, message: "Database query failed." });
                        
                    };
                    if (!results || results.length === 0){
                        console.log("Database query failed at searching for user password")
                        return reject({ status: 404, isValid: false, message: "User not found." });
                        // return res.status(500).json({isValid: false, message: "Database query failed."})
                    }
                    console.log("Search password result: " + results[0].account_password)
                    resolve(results[0].account_password)
                });
            });
        }
        
        const match = await bcrypt.compare(currentPassword, await passwordResult())
        console.log("Does it match:", match);
        if (!match) {
            return res.status(400).json({isValid: false, errorField: "currentPassword", message: "Incorrect current password"})
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Function to update the password in the database
        const updatedPassword = () => {
            return new Promise((resolve, reject) => {
                const sqlQueryUpdateSecurityProfile = `UPDATE user_information
                    SET account_password = ?
                    WHERE user_id = ?`
                connection.query(sqlQueryUpdateSecurityProfile, [hashedPassword, ID], (err, results) => {
                    if (err) {
                        return reject({ status: 500, isValid: false, message: "Database query failed." });
                    }
                    resolve(results);
                })
            })
        }

        await updatedPassword ();
        res.json({isValid: true, message: "Profile Security Data successfully updated."})

    } catch (err) {
        console.log("Error in updating profile security: ", err);
        console.error("Error in updating profile security:", err);
        const status = err.status || 500;
        const message = err.message || "Failed to update profile security.";
        return res.status(status).json({ isValid: false, message });

    }
}

export const userHistoryProfileData = (req, res) => {
    const { ID } = req.params

    const sqlQueryUserHistoryProfile = `SELECT 
	DATE_FORMAT(parking.occupied_at, '%M %d, %Y') as date_in, 
    DATE_FORMAT(parking.occupied_at, '%h:%i %p') as time_in, 
    DATE_FORMAT(parking.vacated_at, '%M %d, %Y') as date_out, 
    DATE_FORMAT(parking.vacated_at, '%h:%i %p') as time_out, duration, 
    CONCAT(parking.zone, " ", lot_id) AS location
    FROM parking
    LEFT JOIN user_information ON user_information.user_id = parking.user_id
    WHERE user_information.user_id   = ?
    ORDER BY occupied_at DESC;`

    connection.query(sqlQueryUserHistoryProfile, [ID], (err, historyData) => {
        if (err) {
            console.log("User history error: " + err)
            return res.status(500).json({isValid: false, message: "Database query failed"})
        }

        console.log(historyData);
        res.json(historyData);
    })

}