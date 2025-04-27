import connection from "../config/connectDB.js";
// import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleLogout = (req, res) => {
    // On Client, also delete the access token

    const cookies = req.cookies


    const sqlQuerySearchUser =  `SELECT email, refresh_token
    FROM user_information
    WHERE refresh_token = ?`

    const sqlQueryDeleteRefreshKey = `UPDATE user_information
    SET refresh_token = null
    WHERE email = ?`

    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;


    // Find the refresh token in the DB
    connection.query(sqlQuerySearchUser, [refreshToken], (err, data) => {
        if (err) {
            
            return res.status(500).json({ message: "Database query error" });
        } 

        if (Object.keys(data).length === 0) {
            res.clearCookie('jwt', {httpOnly: true, secure: true,})
            return res.sendStatus(204); //Successfull but no content

        } 
        connection.query(sqlQueryDeleteRefreshKey, [data[0].email], (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }

            res.clearCookie('jwt', {httpOnly: true, secure: true,}) 
            // also do the secure: true -- only serves on https 
            res.sendStatus(204);
        })

        // Delete the refresh token in the database
        
    })  
}