import connection from "../config/connectDB.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies


    // const sqlQuerySearchUser =  `SELECT email AS username, refresh_token, account_type
    // FROM user_information
    // WHERE refresh_token = ?`

    const sqlQuerySearchUser = `SELECT admin_information.admin_code AS username, "Admin" AS account_type, admin_information.refresh_token
    FROM admin_information
    WHERE refresh_token = ?

    UNION ALL

    SELECT user_information.email as username, user_information.account_type, user_information.refresh_token
    FROM user_information
    WHERE refresh_token = ?`

    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    const refreshToken = cookies.jwt;



    connection.query(sqlQuerySearchUser, [refreshToken, refreshToken], (err, userData) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database query error", err: err });
        } 

        if (Object.keys(userData).length === 0) {
            return res.sendStatus(403); //Forbidden
        }

        

        // Evaluate JWT
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || userData[0].username !== decoded.username) return res.sendStatus(403);

                const accessToken = jwt.sign(
                    { 
                        "UserInfo": {
                            "username": userData[0].username,
                            "accountType": userData[0].account_type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    // { expiresIn: '15m' } 
                    { expiresIn: '30s' } 
                );
                res.json({ accessToken, username: userData[0].username, accountType: userData[0].account_type })
            }
            
        )

        
    })  
}