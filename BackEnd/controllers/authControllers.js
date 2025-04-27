import connection from "../config/connectDB.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Handling Login")

    const sqlQuerySearchUser =  `SELECT email, account_password
    FROM user_information
    WHERE email = ?`

    const sqlQuerySetRefreshKey = `UPDATE user_information
    SET refresh_token = ?
    WHERE email = ?`


    connection.query(sqlQuerySearchUser, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ "message": "Database query error" });
        } 

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ "message": "Invalid email" });
        } 

        bycrypt.compare(password, data[0].account_password)
            .then (match => {
                if (!match) {
                    return res.status(400).json({ "message": "Incorrect password" });
                } 

                // Creating JWT TOKENS
                const accessToken = jwt.sign(
                    { email },
                    // also include the account type
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                const refreshToken = jwt.sign(
                    { email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1D' }
                );

                // Saving refresh token 
                connection.query(sqlQuerySetRefreshKey, [refreshToken, email], (err, data) => {
                    if (err) {
                        console.log('Error in updating refresh token')
                    }
                    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); 
                    // set to one day
                    // not available to js

                    res.json({ accessToken})
                })
                
            }).catch (error => {
                console.log(error.message);
                return res.status(500).json({"message": "Error during password comparison"})
            })
    })  
}