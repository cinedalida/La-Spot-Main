import connection from "../config/connectDB.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies

    const sqlQuerySearchUser = `SELECT admin_information.admin_code AS username, "Admin" AS account_type, admin_information.refresh_token
    FROM admin_information
    WHERE refresh_token = ?

    UNION ALL

    SELECT user_information.email as username, user_information.account_type, user_information.refresh_token
    FROM user_information
    WHERE refresh_token = ?`

    if (!cookies?.jwt) return res.send(401).json({message: "Unauthorized"}); // Unauthorized
    const refreshToken = cookies.jwt;



    connection.query(sqlQuerySearchUser, [refreshToken, refreshToken], (err, userData) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database query error", err: err });
        } 

        if (Object.keys(userData).length === 0) {
            return res.status(403).json({message: "Forbidden -- Invalid refresh token"}); //Forbidden
        }

        

        // Evaluate JWT
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || userData[0].username !== decoded.username) {
                    console.log("err: ", err);
                    console.log("table-username: ", userData[0].username);
                    console.log("cookie-username: ", decoded.username);
                    return res.status(403).json({message: "Forbidden -- Refresh token verification failed"});
                } 

                const accessToken = jwt.sign(
                    { 
                        "UserInfo": {
                            "username": userData[0].username,
                            "accountType": userData[0].account_type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    // { expiresIn: '15m' } 
                    { expiresIn: '10s' } 
                );
                res.json({ accessToken, username: userData[0].username, accountType: userData[0].account_type })
            }
            
        )

        
    })  
}