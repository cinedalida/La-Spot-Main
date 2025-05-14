import connection from "../config/connectDB.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import * as loginValidation from "../validation/loginValidation.js";
import { checkExistingEmail } from "../validation/profileValidation.js";

dotenv.config();

// Setup Nodemailer (Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ojjivillamar4@gmail.com',
        pass: 'hzex bgcv ebku iqxd',
}
});

transporter.verify((err) => {
    if (err) console.error("SMTP config error:", err);
    else console.log("Server ready to send email");
});

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

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    
    try {
        const resultEmailChecking = await loginValidation.checkExistingEmail(email);
        if (resultEmailChecking.exist == true) {
            console.log(resultEmailChecking);
            return res.status(404).json({ message: "Email not found" });
        } else {
            const otpCode = Math.floor(10000 + Math.random() * 90000).toString();
            
            const sql = `
                INSERT INTO password_reset (email, otp_code, expires_at)
                VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
                ON DUPLICATE KEY UPDATE otp_code = VALUES(otp_code), expires_at = DATE_ADD(NOW(), INTERVAL 10 MINUTE)
            `;

            connection.query(sql, [email, otpCode], (err) => {
                if (err) {
                    console.error("Error saving OTP:", err);
                    return res.status(500).json({ message: "Server error.", err });
                }

                transporter.sendMail({
                    from: 'ojjivillamar4@gmail.com',
                    to: email,
                    subject: "Your Password Reset Code",
                    text: `Your password reset code is: ${otpCode}. It expires in 10 minutes.`,
                }, (err) => {
                    if (err) {
                        console.error("Email send error:", err);
                        return res.status(500).json({ message: "Failed to send email", err });
                    }
                    return res.status(200).json({ message: "Reset code sent to email." });
                });
            });
        }
    } catch(error) {
        console.log(error);
    }
}


export const verifyCode = async(req, res) => {
    const { email, code } = req.body;

    const sql = 'SELECT * FROM password_reset WHERE email = ? AND otp_code = ? AND expires_at > NOW()';
        connection.query(sql, [email, code], (err, rows) => {
        if (err) {
            console.error('Error verifying code:', err);
            return res.status(500).json({ message: 'Server error during verification', err });
        }

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }

        return res.status(200).json({ message: 'Code verified' });
    });
};
