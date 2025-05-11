import connection from "../config/connectDB.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleLogin = async (req, res) => {
    const { email: username, password } = req.body;
    console.log("Handling Login")

    let sqlQuerySearchUser;
    if (username.includes("@")){
        sqlQuerySearchUser =  `SELECT user_id as ID, account_password, account_type
        FROM user_information
        WHERE email = ?`
    } else {
        sqlQuerySearchUser =  `SELECT admin_id as ID, account_password, "Admin" as account_type
        FROM admin_information
        WHERE admin_code = ?;`
    }

    let sqlQuerySetRefreshKey;
    if (username.includes("@")) {
        sqlQuerySetRefreshKey = `UPDATE user_information
        SET refresh_token = ?
        WHERE email = ?`
    } else {
        sqlQuerySetRefreshKey = `UPDATE admin_information
        SET refresh_token = ?
        WHERE admin_code = ?`
    }

    

    connection.query(sqlQuerySearchUser, [username], (err, userData) => {
        if (err) {
            return res.status(500).json({ "message": "Database query error" });
        }
        
        console.log(userData)

        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ "message": "Invalid email" });
        } 

        bycrypt.compare(password, userData[0].account_password)
            .then (match => {
                if (!match) {
                    return res.status(400).json({ "message": "Incorrect password" });
                } 

                // Creating JWT TOKENS
                const accessToken = jwt.sign(
                    { 
                        "UserInfo": {
                            "ID": userData[0].ID,
                            "accountType": userData[0].account_type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' } 
                    // { expiresIn: '10s' } 
                );
                console.log("refresh token id state: " +  userData[0].ID)
                const refreshToken = jwt.sign(
                    
                    { "ID": userData[0].ID },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1D' }
                );

                // Saving refresh token 
                connection.query(sqlQuerySetRefreshKey, [refreshToken, username], (err, data) => {
                    if (err) {
                        console.log('Error in updating refresh token')
                    }
                    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); 
                    // set to one day
                    // not available to js

                    res.json({ accessToken, ID: userData[0].ID, accountType: userData[0].account_type })
                })
                
            }).catch (error => {
                console.log(error.message);
                return res.status(500).json({"message": "Error during password comparison"})
            })
    })  
}