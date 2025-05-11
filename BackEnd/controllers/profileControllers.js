import connection from "../config/connectDB.js";
import * as profileValidation from "../validation/profileValidation.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

export const userProfileData = (req, res) => {
    const { ID } = req.params;

    const sqlQeuryUserProfile = `SELECT user_information.user_id, user_information.account_type, CONCAT(user_information.first_name, " ", user_information.last_name) as full_name, user_information.first_name, user_information.last_name, user_information.email, user_information.account_password, vehicle.vehicle_plate, vehicle.vehicle_type
    FROM user_information
    LEFT JOIN vehicle ON user_information.user_id = vehicle.user_id
    WHERE user_information.user_id =  ?`

    connection.query(sqlQeuryUserProfile, [ID], (err, profileData) => {
        if (err) {
            return res.status(500).json({isValid: false, message: "Database query failed"})
        }
            

        console.log(profileData);
        res.json(profileData)
    })
}

export const updateProfileData = async (req, res) => {
    const { first_name, last_name, email, ID, accountType, editingField} = req.body

    console.log(editingField);
    console.log(first_name, last_name, email, ID);

    if (editingField === "personal") {
        // Will check the existence of the email in the table
        const isEmailValid = await profileValidation.checkExistingEmail(email);
        if (isEmailValid.exist){
            return res.status(400).json({isValid: false, errorField: "email", message: "Email already exists"})
        }

        const sqlQueryUpdatePersonalProfile = `UPDATE user_information
            SET first_name = ?, last_name = ?, email = ?
            WHERE user_id = ?`
    
        connection.query(sqlQueryUpdatePersonalProfile, [first_name, last_name, email, ID], (err, data) => {
            if (err){
                return res.status(500).json({isValid: false, message: "Database query failed"})
            } else {

                res.json({isValid: true, message: "Profile Personal Data successfully updated"})
                
                // if (email !== username) {
                //     const accessToken = jwt.sign(
                //         { 
                //             "UserInfo": {
                //                 "username": email,
                //                 "accountType": accountType
                //             }
                //         },
                //         process.env.ACCESS_TOKEN_SECRET,
                //         { expiresIn: '15m' } 
                //         // { expiresIn: '10s' } 
                //     );
    
                //     const refreshToken = jwt.sign(
                //         { "username": email },
                //         process.env.REFRESH_TOKEN_SECRET,
                //         { expiresIn: '1D' }
                //     );

                //     res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); 
                //     console.log("Profile Personal Data (w/ email) successfully updated:", data);
                    
                // } else {
                //     console.log("Profile Personal Data (w/o email) successfully updated:", data);
                //     res.json({isValid: true, message: "Profile Personal Data (w/o email) successfully updated"});
                // }
            }
        })  
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