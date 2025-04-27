import connection from "../config/connectDB.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies


    const sqlQuerySearchUser =  `SELECT email, refresh_token, account_type
    FROM user_information
    WHERE refresh_token = ?`

    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    const refreshToken = cookies.jwt;



    connection.query(sqlQuerySearchUser, [refreshToken], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Database query error" });
        } 

        if (Object.keys(data).length === 0) {
            return res.sendStatus(403); //Forbidden
        }

        

        // Evaluate JWT
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || data[0].email !== decoded.email) return res.sendStatus(403);

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": decoded.email,
                            "accountType": data[0].accountType
                        },
                    },  
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '30s'}
                );
                res.json({ accessToken })
            }
            
        )

        
    })  
}